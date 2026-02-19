import { AlertTriangle, CheckCircle, Eye, Sparkles, Heart, ShoppingCart, Flame } from 'lucide-react';

/* ── Hook Banner ──────────────────────────────────────── */
export function HookBanner() {
  return (
    <section className="py-4 md:py-5">
      <div className="container mx-auto px-6">
        <div className="hidden md:flex items-center gap-4 md:gap-6">
          <div className="flex-1 h-px bg-gradient-to-l from-red-700 to-transparent" />
          <p className="text-red-700 text-lg md:text-xl max-w-3xl text-center">
            You can't skip this salsa right now — it's <span className="font-extrabold">buy one case, get one case</span>, which means you're basically stocking your pantry for <span className="font-extrabold">half price</span> while it lasts.
          </p>
          <div className="flex-1 h-px bg-gradient-to-r from-red-700 to-transparent" />
        </div>
        <div className="flex md:hidden flex-col items-center gap-3">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-700 to-transparent" />
          <p className="text-red-700 text-base text-center px-2">
            You can't skip this salsa right now — it's <span className="font-extrabold">buy one case, get one case</span>, which means you're basically stocking your pantry for <span className="font-extrabold">half price</span> while it lasts.
          </p>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-red-700 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* ── PAS Section ──────────────────────────────────────── */
export function PASSection() {
  const steps = [
    {
      icon: <AlertTriangle className="h-6 w-6 text-red-600" />,
      label: 'The Problem',
      text: 'Tired of last-minute store runs or bland jar salsas that taste nothing like your favorite taquería?',
    },
    {
      icon: <Flame className="h-6 w-6 text-red-600" />,
      label: 'The Pain',
      text: 'That "we\'ll just grab salsa later" plan always shows up as a boring table and a higher grocery bill.',
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-red-600" />,
      label: 'The Solution',
      text: 'Grab this La Costeña BOGO and lock in authentic salsa roja for tacos, chilaquiles, nachos, and breakfast plates — without overpaying.',
    },
  ];

  return (
    <section className="bg-background pt-4 pb-16 md:pt-6 md:pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step) => (
            <div key={step.label} className="flex flex-col items-center text-center gap-4">
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-red-50 dark:bg-red-950/30">
                {step.icon}
              </div>
              <h3 className="font-extrabold text-foreground">{step.label}</h3>
              <p className="text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── AIDA Section ─────────────────────────────────────── */
export function AIDASection() {
  const steps = [
    {
      icon: <Eye className="h-5 w-5" />,
      heading: 'Double the Cans, Same Price',
      body: 'Buy one, get one on La Costeña Homestyle Mexican Salsa — limited time only.',
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      heading: 'Restaurant-Quality Flavor',
      body: 'The classic salsa roja you see in taquerías: authentic Mexican flavor, mild heat, simple high-quality ingredients — and it\'s gluten-free.',
    },
    {
      icon: <Heart className="h-5 w-5" />,
      heading: 'Always Stocked, Always Ready',
      body: 'Versatile enough for breakfast chilaquiles to late-night nachos — effortless taco nights and a pantry that never runs dry.',
    },
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      heading: 'Don\'t Wait',
      body: 'This price won\'t come back once the promo ends. Add it to your cart now while it\'s BOGO — once the deal\'s gone, you\'re back to full price.',
    },
  ];

  return (
    <section className="bg-muted/40 py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.heading}
              className="flex items-start gap-4 bg-background rounded-xl p-5 md:p-6 shadow-sm border border-border"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-red-700 text-white shrink-0 mt-0.5">
                {step.icon}
              </div>
              <div>
                <h3 className="font-extrabold text-foreground mb-1">{step.heading}</h3>
                <p className="text-muted-foreground">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}