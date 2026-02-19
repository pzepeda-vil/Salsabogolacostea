import { motion } from 'motion/react';
import { Button } from './button';
import { cn } from './utils';
import React from 'react';

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
}

interface ActionProps {
  text: string;
  onClick?: () => void;
  href?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  actions: ActionProps[];
  stats: StatProps[];
  images: string[];
  className?: string;
  onImageClick?: () => void;
}

// Timeline offsets
const can1Delay = 1.0;
const can2Delay = 1.2;
const textDelay = 1.7;

const HeroSection = ({ title, subtitle, actions, stats, images, className, onImageClick }: HeroSectionProps) => {
  return (
    <section className={cn('w-full overflow-hidden bg-background py-8 sm:py-10 relative', className)}>
      {/* Inline keyframes for floating bob */}
      <style>{`
        @keyframes freeGlow {
          0% { text-shadow: 0 0 0px transparent; opacity: 0.5; }
          30% { text-shadow: 0 0 20px rgba(220, 38, 38, 0.8), 0 0 40px rgba(220, 38, 38, 0.5), 0 0 60px rgba(220, 38, 38, 0.3); opacity: 1; }
          60% { text-shadow: 0 0 30px rgba(220, 38, 38, 0.9), 0 0 60px rgba(220, 38, 38, 0.6), 0 0 90px rgba(220, 38, 38, 0.3); opacity: 1; }
          100% { text-shadow: 0 0 8px rgba(220, 38, 38, 0.4), 0 0 20px rgba(220, 38, 38, 0.2); opacity: 1; }
        }
        @keyframes floatCan1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(-1.5deg); }
        }
        @keyframes floatCan2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
      `}</style>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 items-center gap-6 px-6 lg:grid-cols-2 lg:gap-8 relative z-10">
        {/* Left Column: Text Content — slides in from left LAST */}
        <motion.div
          className="flex flex-col items-start text-left order-2 lg:order-1"
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: textDelay, duration: 0.7, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-4xl tracking-tight text-foreground sm:text-6xl font-extrabold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: textDelay + 0.1, duration: 0.5 }}
          >
            {title}
          </motion.h1>
          <motion.p
            className="mt-3 max-w-md text-lg text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: textDelay + 0.25, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>
          <motion.div
            className="mt-4 flex flex-wrap justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: textDelay + 0.4, duration: 0.5 }}
          >
            {actions.map((action, index) => {
              if (action.href) {
                return (
                  <a key={index} href={action.href} target="_blank" rel="noopener noreferrer">
                    <Button variant={action.variant} size="lg" className={action.className}>
                      {action.text}
                    </Button>
                  </a>
                );
              }
              return (
                <Button key={index} onClick={action.onClick} variant={action.variant} size="lg" className={action.className}>
                  {action.text}
                </Button>
              );
            })}
          </motion.div>
          <motion.div
            className="mt-8 flex flex-nowrap justify-start gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: textDelay + 0.55, duration: 0.5 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-muted shrink-0">{stat.icon}</div>
                <div className="min-w-0">
                  <p className="text-base sm:text-xl text-foreground">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">{stat.label}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Column: Image Collage */}
        <div className="relative h-[340px] sm:h-[620px] w-full order-1 lg:order-2">
          {/* Phase 3: Can 1 (Green Sauce) — larger, in front, overlapping */}
          <motion.div
            className="absolute left-[32%] top-[2%] -translate-x-1/2 h-[21rem] w-[21rem] sm:h-[36rem] sm:w-[36rem] z-20 lg:left-[18%] lg:top-[5%] lg:-translate-x-1/2 lg:h-[28rem] lg:w-[28rem]"
            initial={{ opacity: 0, scale: 0.8, y: 30, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -3 }}
            transition={{
              delay: can1Delay,
              duration: 0.6,
              ease: 'easeOut',
            }}
          >
            <img
              src={images[0]}
              alt="Product image"
              className="h-full w-full object-contain drop-shadow-lg transition-[filter] duration-300 hover:drop-shadow-2xl"
              style={{
                animation: `floatCan1 4s ease-in-out ${can1Delay + 0.6}s infinite`,
              }}
            />
          </motion.div>

          {/* Phase 3: Can 2 (Mexican/Red Sauce) — smaller, behind, overlapping */}
          <motion.div
            className="absolute left-[62%] top-[15%] -translate-x-1/2 h-52 w-52 sm:h-80 sm:w-80 z-10 lg:left-[58%] lg:top-[18%] lg:-translate-x-1/2 lg:h-[22rem] lg:w-[22rem]"
            initial={{ opacity: 0, scale: 0.8, y: 30, rotate: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: 4 }}
            transition={{
              delay: can2Delay,
              duration: 0.6,
              ease: 'easeOut',
            }}
          >
            <img
              src={images[1]}
              alt="Product image"
              className="h-full w-full object-contain drop-shadow-lg transition-[filter] duration-300 hover:drop-shadow-2xl"
              style={{
                animation: `floatCan2 4.5s ease-in-out ${can2Delay + 0.6}s infinite`,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;