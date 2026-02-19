"use client"

import { motion, useReducedMotion } from "motion/react"
import { Check } from "lucide-react"
import { useState } from "react"
import { cn } from "./utils"

interface ProfileCardProps {
  name?: string
  description?: string
  image?: string
  isVerified?: boolean
  stat1Value?: number | string
  stat1Label?: string
  stat1Icon?: React.ReactNode
  stat2Value?: number | string
  stat2Label?: string
  stat2Icon?: React.ReactNode
  enableAnimations?: boolean
  className?: string
  buttonText?: string
  onButtonClick?: () => void
  customButton?: React.ReactNode
  /** "cover" = full-bleed photo background; "product" = centered product on clean bg */
  variant?: "cover" | "product"
  /** Tailwind bg class for the verified check badge (default: "bg-green-500") */
  verifiedColor?: string
}

export function ProfileCard({
  name = "Sophie Bennett",
  description = "Product Designer who focuses on simplicity & usability.",
  image = "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=800&h=800&fit=crop&auto=format&q=80",
  isVerified = true,
  stat1Value,
  stat1Label,
  stat1Icon,
  stat2Value,
  stat2Label,
  stat2Icon,
  enableAnimations = true,
  className,
  buttonText = "Shop Now",
  onButtonClick,
  customButton,
  variant = "cover",
  verifiedColor = "bg-green-500",
}: ProfileCardProps) {
  const [hovered, setHovered] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = enableAnimations && !shouldReduceMotion
  const isProduct = variant === "product"

  const containerVariants = {
    rest: {
      scale: 1,
      y: 0,
      filter: "blur(0px)",
    },
    hover: shouldAnimate
      ? {
          scale: 1.02,
          y: -4,
          filter: "blur(0px)",
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 28,
            mass: 0.6,
          },
        }
      : {},
  }

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.08 },
  }

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.6,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      scale: 0.95,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      },
    },
  }

  const letterVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 200,
        mass: 0.8,
      },
    },
  }

  // ─── Product variant ───────────────────────────────────────────
  if (isProduct) {
    return (
      <motion.div
        data-slot="profile-hover-card"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial="rest"
        whileHover="hover"
        variants={containerVariants}
        className={cn(
          "relative flex flex-col w-80 rounded-3xl border border-border/20 text-card-foreground overflow-hidden shadow-xl shadow-black/5 cursor-pointer group bg-background",
          "dark:shadow-black/20",
          className
        )}
      >
        {/* Product Image Area */}
        <div className="flex items-center justify-center px-6 pt-8 pb-4 bg-gradient-to-b from-muted/40 to-background">
          <motion.img
            src={image}
            alt={name}
            className="h-48 w-auto object-contain drop-shadow-lg"
            variants={imageVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </div>

        {/* Content */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col flex-1 p-6 pt-2 space-y-3"
        >
          {/* Name and Verification */}
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <motion.h2
              className="text-xl font-bold text-foreground"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.02,
                  },
                },
              }}
            >
              {name.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h2>
            {isVerified && (
              <motion.div
                variants={itemVariants}
                className={cn("flex items-center justify-center w-4 h-4 rounded-full text-white", verifiedColor)}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { type: "spring", stiffness: 400, damping: 20 },
                }}
              >
                <Check className="w-2.5 h-2.5" />
              </motion.div>
            )}
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-muted-foreground text-sm leading-relaxed"
          >
            {description}
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 pt-1"
          >
            {stat1Value != null && (
              <div className="flex items-center gap-2 text-muted-foreground">
                {stat1Icon}
                <span className="font-semibold text-foreground">{stat1Value}</span>
                <span className="text-sm">{stat1Label}</span>
              </div>
            )}
            {stat2Value != null && (
              <div className="flex items-center gap-2 text-muted-foreground">
                {stat2Icon}
                <span className="font-semibold text-foreground">{stat2Value}</span>
                <span className="text-sm">{stat2Label}</span>
              </div>
            )}
          </motion.div>

          {/* Button */}
          <motion.div variants={itemVariants} className="pt-1">
            {customButton ? (
              <div className="w-full">{customButton}</div>
            ) : (
              <motion.button
                onClick={onButtonClick}
                whileHover={{
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "w-full cursor-pointer py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-200",
                  "border border-border/20 shadow-sm",
                  "bg-foreground text-background hover:bg-foreground/90",
                  "transform-gpu"
                )}
              >
                {buttonText}
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    )
  }

  // ─── Cover variant (original) ──────────────────────────────────
  return (
    <motion.div
      data-slot="profile-hover-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial="rest"
      whileHover="hover"
      variants={containerVariants}
      className={cn(
        "relative w-80 h-96 rounded-3xl border border-border/20 text-card-foreground overflow-hidden shadow-xl shadow-black/5 cursor-pointer group backdrop-blur-sm",
        "dark:shadow-black/20",
        className
      )}
    >
      {/* Full Cover Image */}
      <motion.img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        variants={imageVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />

      {/* Smooth Blur Overlay - Multiple layers for seamless fade */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 via-background/20 via-background/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background/90 via-background/60 via-background/30 via-background/15 via-background/8 to-transparent backdrop-blur-[1px]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background/85 via-background/40 to-transparent backdrop-blur-sm" />

      {/* Content */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        className="absolute bottom-0 left-0 right-0 p-6 space-y-4"
      >
        {/* Name and Verification */}
        <motion.div variants={itemVariants} className="flex items-center gap-2">
          <motion.h2
            className="text-2xl font-bold text-foreground"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.02,
                },
              },
            }}
          >
            {name.split("").map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                className="inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h2>
          {isVerified && (
            <motion.div
              variants={itemVariants}
              className={cn("flex items-center justify-center w-4 h-4 rounded-full text-white", verifiedColor)}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                transition: { type: "spring", stiffness: 400, damping: 20 },
              }}
            >
              <Check className="w-2.5 h-2.5" />
            </motion.div>
          )}
        </motion.div>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-muted-foreground text-sm leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-6 pt-2"
        >
          <div className="flex items-center gap-2 text-muted-foreground">
            {stat1Icon}
            <span className="font-semibold text-foreground">{stat1Value}</span>
            <span className="text-sm">{stat1Label}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            {stat2Icon}
            <span className="font-semibold text-foreground">{stat2Value}</span>
            <span className="text-sm">{stat2Label}</span>
          </div>
        </motion.div>

        {/* Button */}
        <motion.div variants={itemVariants}>
          {customButton ? (
            customButton
          ) : (
            <motion.button
              onClick={onButtonClick}
              whileHover={{
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 25 },
              }}
              whileTap={{ scale: 0.98 }}
              className={cn(
                "w-full cursor-pointer py-3 px-4 rounded-2xl font-semibold text-sm transition-all duration-200",
                "border border-border/20 shadow-sm",
                "bg-foreground text-background hover:bg-foreground/90",
                "transform-gpu"
              )}
            >
              {buttonText}
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}