import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    ShopifyBuy: any;
  }
}

// Global map — survives React hot-reloads so we never duplicate a widget
const createdWidgetIds = new Set<string>();

interface ShopifyBuyButtonProps {
  productId: string;
  domain: string;
  storefrontAccessToken: string;
  componentId: string;
  /** Direct checkout/product URL used as fallback when the SDK can't load */
  fallbackUrl?: string;
  fallbackLabel?: string;
  /** Text shown on the Shopify buy button (default: "Add to cart") */
  buttonText?: string;
  /** Where the button sends the user: "checkout" (direct) or "cart" (default) */
  buttonDestination?: 'checkout' | 'cart';
  /** Show quantity input alongside the button (default: false) */
  showQuantity?: boolean;
}

export function ShopifyBuyButton({
  productId,
  domain,
  storefrontAccessToken,
  componentId,
  fallbackUrl = 'https://shoplacostena.com/collections/salsas/products/la-costena-homestyle-mexcian-salsa?variant=42426705018968',
  fallbackLabel = 'Add to Cart',
  buttonText = 'Add to cart',
  buttonDestination = 'cart',
  showQuantity = false,
}: ShopifyBuyButtonProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkFailed, setSdkFailed] = useState(false);
  const sdkReadyRef = useRef(false); // avoids stale-closure in setTimeout

  const SCRIPT_URL =
    'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

  // ── Step 1: Load the Shopify Buy Button SDK script (once) ──
  useEffect(() => {
    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function markReady() {
      if (cancelled) return;
      sdkReadyRef.current = true;
      setSdkReady(true);
    }

    function pollForUI(attempts = 0) {
      if (cancelled) return;
      if (window.ShopifyBuy?.UI) {
        markReady();
        return;
      }
      if (attempts > 40) {
        // ~4 s of polling — SDK genuinely failed
        if (!cancelled) setSdkFailed(true);
        return;
      }
      timeoutId = setTimeout(() => pollForUI(attempts + 1), 100);
    }

    // Already loaded from a previous mount
    if (window.ShopifyBuy?.UI) {
      markReady();
      return;
    }

    // Another instance already inserted the <script>
    const existing = document.querySelector(
      `script[src="${SCRIPT_URL}"]`
    ) as HTMLScriptElement | null;

    if (existing) {
      if (window.ShopifyBuy?.UI) {
        markReady();
      } else {
        existing.addEventListener('load', () => pollForUI(), { once: true });
        existing.addEventListener(
          'error',
          () => { if (!cancelled) setSdkFailed(true); },
          { once: true }
        );
        pollForUI();
      }
      return () => { cancelled = true; clearTimeout(timeoutId); };
    }

    // Insert the script for the first time
    const script = document.createElement('script');
    script.async = true;
    script.src = SCRIPT_URL;
    script.addEventListener('load', () => pollForUI(), { once: true });
    script.addEventListener(
      'error',
      () => { if (!cancelled) setSdkFailed(true); },
      { once: true }
    );
    document.head.appendChild(script);

    // Safety-net: only fire if the SDK never actually became ready
    const safetyTimeout = setTimeout(() => {
      if (!cancelled && !sdkReadyRef.current) setSdkFailed(true);
    }, 10000);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
      clearTimeout(safetyTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Step 2: Create the widget ONCE (never destroy) ──
  useEffect(() => {
    if (!sdkReady || !nodeRef.current) return;

    // Already created — either in this mount or a previous hot-reload mount
    // But verify the DOM node actually still has the widget inside it
    if (createdWidgetIds.has(componentId) && nodeRef.current.children.length > 0) {
      return;
    }

    const node = nodeRef.current;
    // Clear any stale DOM (e.g. from a previous mount whose widget got GC'd)
    node.innerHTML = '';

    try {
      const client = window.ShopifyBuy.buildClient({
        domain,
        storefrontAccessToken,
      });

      window.ShopifyBuy.UI.onReady(client).then((ui: any) => {
        // Double-check in case of race between two instances
        if (createdWidgetIds.has(componentId) && node.children.length > 0) return;

        createdWidgetIds.add(componentId);

        ui.createComponent('product', {
          id: productId,
          node,
          moneyFormat: '%24%7B%7Bamount%7D%7D',
          options: {
            product: {
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                  },
                },
                button: {
                  'font-weight': 'bold',
                  'font-size': '18px',
                  'padding-top': '17px',
                  'padding-bottom': '17px',
                  'width': '100%',
                  ':hover': { 'background-color': '#c61b38' },
                  'background-color': '#dc1e3e',
                  ':focus': { 'background-color': '#c61b38' },
                  'border-radius': '13px',
                },
                quantityInput: {
                  'font-size': '18px',
                  'padding-top': '17px',
                  'padding-bottom': '17px',
                },
              },
              buttonDestination,
              contents: {
                img: false,
                button: !showQuantity,
                buttonWithQuantity: showQuantity,
                title: false,
                price: false,
              },
              text: { button: buttonText },
            },
            productSet: {
              styles: {
                products: {
                  '@media (min-width: 601px)': { 'margin-left': '-20px' },
                },
              },
            },
            modalProduct: {
              contents: {
                img: false,
                imgWithCarousel: true,
                button: false,
                buttonWithQuantity: true,
              },
              styles: {
                product: {
                  '@media (min-width: 601px)': {
                    'max-width': '100%',
                    'margin-left': '0px',
                    'margin-bottom': '0px',
                  },
                },
                button: {
                  'font-weight': 'bold',
                  'font-size': '18px',
                  'padding-top': '17px',
                  'padding-bottom': '17px',
                  'width': '100%',
                  ':hover': { 'background-color': '#c61b38' },
                  'background-color': '#dc1e3e',
                  ':focus': { 'background-color': '#c61b38' },
                  'border-radius': '13px',
                },
                quantityInput: {
                  'font-size': '18px',
                  'padding-top': '17px',
                  'padding-bottom': '17px',
                },
              },
              text: { button: 'Add to cart' },
            },
            option: {},
            cart: {
              styles: {
                button: {
                  'font-weight': 'bold',
                  'font-size': '18px',
                  'padding-top': '17px',
                  'padding-bottom': '17px',
                  ':hover': { 'background-color': '#c61b38' },
                  'background-color': '#dc1e3e',
                  ':focus': { 'background-color': '#c61b38' },
                  'border-radius': '13px',
                },
              },
              text: { total: 'Subtotal', button: 'Checkout' },
            },
            toggle: {
              styles: {
                toggle: {
                  'font-weight': 'bold',
                  'background-color': '#dc1e3e',
                  ':hover': { 'background-color': '#c61b38' },
                  ':focus': { 'background-color': '#c61b38' },
                },
                count: { 'font-size': '18px' },
              },
            },
          },
        });
      });
    } catch {
      // Only set failed if the SDK genuinely can't create the component
      setSdkFailed(true);
    }

    // NO cleanup — widget lives forever once created
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdkReady, componentId]);

  // ── Fallback button (shown ONLY when SDK genuinely can't load) ──
  if (sdkFailed) {
    return (
      <a
        href={fallbackUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full cursor-pointer py-3 px-4 rounded-2xl font-semibold text-sm text-center transition-all duration-200 border border-border/20 shadow-sm bg-[#dc1e3e] text-white hover:bg-[#c61b38] transform-gpu no-underline"
      >
        {fallbackLabel}
      </a>
    );
  }

  return (
    <div className="w-full relative min-h-[52px]">
      {/* Shopify SDK mounts its iframe/widget inside this div */}
      <div
        ref={nodeRef}
        id={componentId}
        className="w-full [&_iframe]:!max-w-full [&_*]:!max-w-full [&_.shopify-buy__product]:!max-w-full [&_.shopify-buy__product]:!w-full [&_.shopify-buy__product]:!m-0 [&_.shopify-buy__btn-wrapper]:!w-full [&_.shopify-buy__btn]:!w-full"
      />
      {/* Loading placeholder while SDK loads */}
      {!sdkReady && !sdkFailed && (
        <div
          className="block w-full py-3 px-4 rounded-2xl font-semibold text-sm text-center bg-[#dc1e3e] text-white opacity-60 animate-pulse"
        >
          {buttonText}
        </div>
      )}
    </div>
  );
}
