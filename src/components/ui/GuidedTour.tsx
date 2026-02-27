"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import type { TourStep } from "@/lib/tour-steps";

interface GuidedTourProps {
  steps: TourStep[];
  tourId: string;
  onComplete?: () => void;
  onSkip?: () => void;
}

export default function GuidedTour({ steps, tourId, onComplete, onSkip }: GuidedTourProps) {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [mounted, setMounted] = useState(false);
  const retryRef = useRef<number>(0);

  // Only activate if ?tour=true and not already completed
  useEffect(() => {
    setMounted(true);
    const hasTourParam = searchParams.get("tour") === "true";
    const isCompleted = localStorage.getItem(`tour_${tourId}_complete`) === "true";

    if (hasTourParam && !isCompleted) {
      // Delay to let editor load
      const timer = setTimeout(() => setIsActive(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [searchParams, tourId]);

  // Track target element position
  const updateTargetRect = useCallback(() => {
    if (!isActive || currentStep >= steps.length) return;
    const step = steps[currentStep];
    const el = document.querySelector(step.target);
    if (el) {
      setTargetRect(el.getBoundingClientRect());
      retryRef.current = 0;
    } else if (retryRef.current < 20) {
      retryRef.current++;
      requestAnimationFrame(updateTargetRect);
    }
  }, [isActive, currentStep, steps]);

  useEffect(() => {
    if (!isActive) return;
    updateTargetRect();

    const onScroll = () => updateTargetRect();
    const onResize = () => updateTargetRect();
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [isActive, updateTargetRect]);

  const finishTour = useCallback((skipped: boolean) => {
    localStorage.setItem(`tour_${tourId}_complete`, "true");
    setIsActive(false);
    // Clean URL
    const url = new URL(window.location.href);
    url.searchParams.delete("tour");
    window.history.replaceState(null, "", url.pathname);
    if (skipped) onSkip?.();
    else onComplete?.();
  }, [tourId, onComplete, onSkip]);

  const handleNext = () => {
    if (currentStep >= steps.length - 1) {
      finishTour(false);
    } else {
      setCurrentStep((s) => s + 1);
      setTargetRect(null);
    }
  };

  const handleSkip = () => finishTour(true);

  if (!mounted || !isActive || steps.length === 0) return null;

  const step = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const PAD = 8;

  // Calculate tooltip position with viewport clamping
  const TOOLTIP_W = 288; // w-72
  const TOOLTIP_H_EST = 200; // estimated height
  const MARGIN = 12;

  let tooltipStyle: React.CSSProperties = {
    position: "fixed",
    zIndex: 10001,
  };

  if (targetRect) {
    let top = 0;
    let left = 0;

    switch (step.placement) {
      case "right":
        top = targetRect.top;
        left = targetRect.right + MARGIN;
        break;
      case "left":
        top = targetRect.top;
        left = targetRect.left - TOOLTIP_W - MARGIN;
        break;
      case "bottom":
        top = targetRect.bottom + MARGIN;
        left = targetRect.left;
        break;
      case "top":
        top = targetRect.top - TOOLTIP_H_EST - MARGIN;
        left = targetRect.left;
        break;
    }

    // Clamp horizontal
    if (left + TOOLTIP_W > window.innerWidth - MARGIN) {
      left = window.innerWidth - TOOLTIP_W - MARGIN;
    }
    if (left < MARGIN) left = MARGIN;

    // Clamp vertical
    if (top + TOOLTIP_H_EST > window.innerHeight - MARGIN) {
      top = window.innerHeight - TOOLTIP_H_EST - MARGIN;
    }
    if (top < MARGIN) top = MARGIN;

    tooltipStyle.top = top;
    tooltipStyle.left = left;
  } else {
    // Fallback: center
    tooltipStyle.top = "50%";
    tooltipStyle.left = "50%";
    tooltipStyle.transform = "translate(-50%, -50%)";
  }

  return createPortal(
    <>
      {/* Backdrop with cutout */}
      <div
        className="fixed inset-0"
        style={{ zIndex: 9999, pointerEvents: "none" }}
      >
        {/* Full overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "rgba(0,0,0,0.55)", pointerEvents: "auto" }}
          onClick={handleSkip}
        />

        {/* Cutout (transparent area over target) */}
        {targetRect && (
          <div
            className="absolute rounded-xl"
            style={{
              top: targetRect.top - PAD,
              left: targetRect.left - PAD,
              width: targetRect.width + PAD * 2,
              height: targetRect.height + PAD * 2,
              background: "transparent",
              boxShadow: "0 0 0 4px rgba(249,115,22,0.4)",
              pointerEvents: "auto",
              zIndex: 10000,
            }}
          />
        )}
      </div>

      {/* Tooltip card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="w-72 rounded-2xl border shadow-2xl p-5"
          style={{
            ...tooltipStyle,
            background: "#111111",
            borderColor: "#262626",
            pointerEvents: "auto",
          }}
        >
          {/* Step counter */}
          <p className="text-[10px] font-bold mb-2 uppercase tracking-wider" style={{ color: "#F97316" }}>
            Passo {currentStep + 1} de {steps.length}
          </p>

          <h3 className="text-sm font-semibold text-white mb-1">{step.title}</h3>
          <p className="text-xs leading-relaxed mb-5" style={{ color: "#A3A3A3" }}>
            {step.description}
          </p>

          {/* Progress dots */}
          <div className="flex gap-1.5 mb-4">
            {steps.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full flex-1 transition-all duration-300"
                style={{ backgroundColor: i <= currentStep ? "#F97316" : "#262626" }}
              />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleSkip}
              className="text-xs cursor-pointer transition-colors hover:text-white"
              style={{ color: "#737373" }}
            >
              Pular tour
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-1.5 rounded-xl text-xs font-semibold text-white transition-all hover:opacity-90 cursor-pointer"
              style={{ background: "#F97316" }}
            >
              {isLastStep ? "Concluir" : "Proximo"}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>,
    document.body
  );
}
