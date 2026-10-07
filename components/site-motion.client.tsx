"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * SiteMotionController:
 * High-performance, single-observer scroll reveal and route motion engine.
 * - Zero scroll event listeners or requestAnimationFrame loops.
 * - Only reveals elements once, unobserving them immediately to preserve 60-120fps.
 * - Safe progressive enhancement: content is fully visible if JS is disabled or before hydration.
 * - Full prefers-reduced-motion compliance.
 */
export function SiteMotionController() {
  const pathname = usePathname();

  useEffect(() => {
    // 1. Mark document as motion ready so CSS reveal styles activate safely
    document.documentElement.dataset.motionReady = "true";

    // 2. Check for prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-motion]").forEach((el) => {
        el.setAttribute("data-motion-state", "revealed");
      });
      return;
    }

    // 3. Create single lightweight IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-motion-state", "revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    // 4. Observe all pending motion elements
    const elements = document.querySelectorAll(
      '[data-motion]:not([data-motion-state="revealed"])'
    );
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
