import HeroSection from './components/ui/hero-section-9';
import { AnimatedTestimonials } from './components/ui/animated-testimonials';
import InfiniteGallery from './components/ui/3d-gallery-photography';
import { HookBanner, AIDASection } from './components/sales-copy';
import { Button } from './components/ui/button';
import { ShoppingCart, Percent, Clock, ArrowUp, Package, Flame } from 'lucide-react';
import { ProfileCard } from './components/ui/profile-card';
import { ShopifyBuyButton } from './components/shopify-buy-button';
// ⬇️ GITHUB DEPLOY TODO
import salsaCan from '../assets/9e152029f71ab7052690eda8f70434dac3ac015b.png';
import greenSalsaCan from '../assets/5943dcec7e6d114e9db2562e00c11965d2278d3a.png';
import laCostaLogo from '../assets/6ff147dbdf1316080fbd360b6d6bb0ec22a8b2d6.png';
import greenSalsaCanCard from '../assets/cead28caf626f35744c63da8a855fb56ef2c307f.png';
import mexicanSalsaCanCard from '../assets/d54207facb11fab29ad6d48d1c4984cdf4a27da2.png';

import { useState, useEffect, useCallback, useRef } from 'react';

const testimonials = [
  {
    quote:
      "La Costeña salsa is the only brand I trust for taco night. The BOGO deal made it a no-brainer — I stocked up on six cases and my family couldn't be happier!",
    name: "Maria Gutierrez",
    designation: "Home Cook & Salsa Lover",
    src: "https://images.unsplash.com/photo-1683556262029-56f31fbf75ee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXRpbmElMjB3b21hbiUyMGNvb2tpbmclMjBraXRjaGVuJTIwc2Fsc2F8ZW58MXx8fHwxNzcxNDI5ODA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    quote:
      "I grabbed a couple of cases for a weekend BBQ and everyone kept asking where the salsa was from. Bold, smoky, and absolutely authentic. Best deal I've found all year.",
    name: "Carlos Mendez",
    designation: "Weekend Grill Master",
    src: "https://images.unsplash.com/photo-1653886764101-64ff56616a11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwbWFuJTIwZ3JpbGxpbmclMjBiYXJiZWN1ZSUyMG91dGRvb3J8ZW58MXx8fHwxNzcxNDI5ODA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    quote:
      "Honestly the best salsa you can get off the shelf. Thick, chunky, and packed with real flavor. The buy-one-get-one deal is just the cherry on top!",
    name: "Sofia Ramirez",
    designation: "Snack Enthusiast",
    src: "https://images.unsplash.com/flagged/photo-1579632993381-847f6a71a3cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwZWF0aW5nJTIwdGFjb3MlMjBjaGlwcyUyMHNhbHNhfGVufDF8fHx8MTc3MTQyOTgwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    quote:
      "Our family dinners always feature La Costeña. The homestyle flavor reminds me of my abuela's kitchen. Getting two for the price of one? You can't beat that.",
    name: "Diego Torres",
    designation: "Family Dinner Champion",
    src: "https://images.unsplash.com/photo-1616895428703-598b1d6fe4f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoaXNwYW5pYyUyMGZhbWlseSUyMGRpbm5lciUyMHRhYmxlJTIwZm9vZHxlbnwxfHx8fDE3NzE0Mjk4MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    quote:
      "As a chef, I'm picky about my ingredients. La Costeña delivers restaurant-quality salsa at a grocery store price — especially with this BOGO promotion.",
    name: "Roberto Silva",
    designation: "Professional Chef",
    src: "https://images.unsplash.com/photo-1606625736126-3b5b2d913f12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBjaGVmJTIwY29va2luZyUyMG1leGljYW4lMjBmb29kJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzE0Mjk4MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1734989435134-7e4885259231?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwc2Fsc2ElMjBib3dsJTIwZnJlc2glMjBpbmdyZWRpZW50c3xlbnwxfHx8fDE3NzE0MzAyMjl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Fresh salsa bowl' },
  { src: 'https://images.unsplash.com/photo-1711989874705-bb85dc205541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3J0aWxsYSUyMGNoaXBzJTIwbmFjaG9zJTIwc2Fsc2ElMjBkaXB8ZW58MXx8fHwxNzcxNDMwMjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Tortilla chips and salsa' },
  { src: 'https://images.unsplash.com/photo-1766158554170-1e8b1899c8ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBjaGlsaSUyMHBlcHBlcnMlMjBjbG9zZSUyMHVwfGVufDF8fHx8MTc3MTQzMDIzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Red chili peppers' },
  { src: 'https://images.unsplash.com/photo-1767978529638-ff1faefa00c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHRvbWF0b2VzJTIwdmluZSUyMGhhcnZlc3R8ZW58MXx8fHwxNzcxNDMwMjMwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Fresh tomatoes' },
  { src: 'https://images.unsplash.com/photo-1762765684587-14f711d01957?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwdGFjb3MlMjBzdHJlZXQlMjBmb29kJTIwY29sb3JmdWx8ZW58MXx8fHwxNzcxNDMwMjMxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Mexican tacos' },
  { src: 'https://images.unsplash.com/photo-1767156969831-0beee76fa958?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaWxhbnRybyUyMGhlcmJzJTIwZnJlc2glMjBncmVlbnxlbnwxfHx8fDE3NzE0MzAyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Fresh cilantro' },
  { src: 'https://images.unsplash.com/photo-1648437595604-f1794490053c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaW1lJTIwc2xpY2VzJTIwY2l0cnVzJTIwZ3JlZW58ZW58MXx8fHwxNzcxNDMwMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Lime slices' },
  { src: 'https://images.unsplash.com/photo-1770353361865-608a07f03ef8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYWxhcGUlQzMlQjFvJTIwcGVwcGVyJTIwZ3JlZW4lMjBzcGljeXxlbnwxfHx8fDE3NzE0MzAyMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Jalapeño peppers' },
];

export default function App() {
  // v2 - updated Mexican Salsa componentId + full-width buttons
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [galleryLocked, setGalleryLocked] = useState(false);
  const gallerySectionRef = useRef<HTMLElement>(null);
  const hasLockedOnceRef = useRef(false);

  const isMobile = () => window.innerWidth < 768;

  const handleScroll = useCallback(() => {
    setShowBackToTop(window.scrollY > 400);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Mobile scroll-lock when gallery enters viewport
  useEffect(() => {
    const section = gallerySectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isMobile() && !hasLockedOnceRef.current) {
          hasLockedOnceRef.current = true;
          // Snap section into full view then lock
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Small delay so the smooth scroll finishes before we lock
          setTimeout(() => {
            setGalleryLocked(true);
            document.body.style.overflow = 'hidden';
            // Auto-unlock after 6 seconds so user isn't stuck
            setTimeout(() => {
              setGalleryLocked(false);
              document.body.style.overflow = '';
            }, 6000);
          }, 500);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Reset lock flag on resize so it can re-trigger if needed
  useEffect(() => {
    const handleResize = () => {
      if (!isMobile() && galleryLocked) {
        setGalleryLocked(false);
        document.body.style.overflow = '';
        hasLockedOnceRef.current = false;
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [galleryLocked]);

  const unlockGallery = () => {
    setGalleryLocked(false);
    document.body.style.overflow = '';
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToProducts = () => {
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  const heroData = {
    title: (
      <>
        Buy One, Get One <br />
        <span className="text-red-600" style={{ animation: 'freeGlow 2s ease-out 2.0s both' }}>FREE!</span>
      </>
    ),
    subtitle:
      'Get 48 cans of our authentic Homestyle Mexican Salsa & Green Salsa — buy one case, get one FREE. Rich, bold flavor made with real ingredients — limited time only!',
    actions: [
      {
        text: 'Shop Now',
        onClick: scrollToProducts,
        variant: 'default' as const,
        className: 'bg-red-700 hover:bg-red-800 text-white',
      },
    ],
    stats: [
      {
        value: '48',
        label: 'Cans of Salsa',
        icon: <ShoppingCart className="h-5 w-5 text-muted-foreground" />,
      },
      {
        value: '50%',
        label: 'Savings',
        icon: <Percent className="h-5 w-5 text-muted-foreground" />,
      },
      {
        value: 'Limited',
        label: 'Time Offer',
        icon: <Clock className="h-5 w-5 text-muted-foreground" />,
      },
    ],
    images: [greenSalsaCan, salsaCan],
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <HeroSection
        title={heroData.title}
        subtitle={heroData.subtitle}
        actions={heroData.actions}
        stats={heroData.stats}
        images={heroData.images}
        onImageClick={scrollToProducts}
      />
      {/* Product Cards Section */}
      <section className="bg-background py-12 md:py-20" id="products">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 md:gap-6 mb-4">
            {/* Left decorative line — fades from transparent to black */}
            <div
              className="flex-1 h-px"
              style={{
                background: 'linear-gradient(to right, transparent, black)',
              }}
            />
            <h2 className="text-center text-3xl md:text-4xl font-bold tracking-tight text-foreground shrink-0">
              Choose Your Flavor
            </h2>
            {/* Right decorative line — fades from black to transparent */}
            <div
              className="flex-1 h-px"
              style={{
                background: 'linear-gradient(to right, black, transparent)',
              }}
            />
          </div>
          <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
            Two bold salsas, one unbeatable deal. Pick your favorite — or get both with BOGO.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            {/* Mexican Salsa Card */}
            <ProfileCard
              variant="product"
              name="Mexican Salsa"
              description="Bold, smoky Homestyle salsa packed with real tomatoes, jalapeños, and authentic Mexican spices. A flavor that brings the heat."
              image={mexicanSalsaCanCard}
              isVerified={true}
              verifiedColor="bg-red-500"
              stat2Value="BOGO"
              stat2Label="deal"
              stat2Icon={<Flame className="w-4 h-4 text-red-500" />}
              customButton={
                <ShopifyBuyButton
                  productId="8197714149464"
                  domain="221d6b-d4.myshopify.com"
                  storefrontAccessToken="46370507e067045df1008633a852b562"
                  componentId="product-component-1771513606642"
                  buttonText="Add to cart"
                  showQuantity={false}
                />
              }
            />
            {/* Green Salsa Card */}
            <ProfileCard
              variant="product"
              name="Green Salsa"
              description="Tangy tomatillo salsa with fresh cilantro and green chili. A zesty kick that elevates tacos, burritos, and everything in between."
              image={greenSalsaCanCard}
              isVerified={true}
              stat2Value="BOGO"
              stat2Label="deal"
              stat2Icon={<Flame className="w-4 h-4 text-green-500" />}
              customButton={
                <ShopifyBuyButton
                  productId="8197683118168"
                  domain="221d6b-d4.myshopify.com"
                  storefrontAccessToken="46370507e067045df1008633a852b562"
                  componentId="product-component-1771513128179"
                  buttonText="Add to cart"
                  showQuantity={false}
                  fallbackUrl="https://shoplacostena.com/collections/salsas/products/la-costena-green-mexican-salsa"
                  fallbackLabel="Add to Cart"
                />
              }
            />
          </div>
        </div>
      </section>
      {/* Hook Banner */}
      <HookBanner />
      <section className="bg-background pt-0 pb-2 md:pt-0 md:pb-4 lg:pt-0 lg:pb-6">
        <div className="container mx-auto px-6">
          <AnimatedTestimonials testimonials={testimonials} autoplay />
        </div>
      </section>
      {/* AIDA — Attention, Interest, Desire, Action */}
      <AIDASection />
      {/* 3D Gallery Section */}
      <section ref={gallerySectionRef} className="relative bg-black">
        <InfiniteGallery
          images={galleryImages}
          speed={1.2}
          zSpacing={3}
          visibleCount={12}
          falloff={{ near: 0.8, far: 14 }}
          className="h-screen w-full"
        />
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center text-center px-4">
          <img src={laCostaLogo} alt="La Costeña" className="w-48 md:w-64 mb-4" draggable={false} />
          <h2 className="text-3xl md:text-6xl tracking-tight text-white mix-blend-exclusion font-extrabold">
            Made with Real Ingredients
          </h2>
          <p className="mt-2 text-xs md:text-sm text-white/50 mix-blend-exclusion">
          </p>
          <Button
            size="lg"
            className="mt-8 bg-red-700 hover:bg-red-800 text-white pointer-events-auto"
            onClick={scrollToProducts}
          >
            Shop Now
          </Button>
        </div>
        <div className="absolute bottom-6 left-0 right-0 text-center text-white/60 text-xs pointer-events-none">
          <p className="hidden md:block">Use mouse wheel or arrow keys to explore</p>
        </div>
      </section>
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-red-700 text-white shadow-lg transition-all duration-300 hover:bg-red-800 hover:scale-110 cursor-pointer ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  );
}