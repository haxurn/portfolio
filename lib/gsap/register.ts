"use client";

/**
 * The only module allowed to import from "gsap/*". Registers plugins once,
 * sets project defaults, and re-exports what components need.
 *
 * Safe to evaluate during SSR: GSAP guards every DOM touch behind a
 * `typeof window` check, and nothing here creates a tween.
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";
import { DUR, EASE } from "./defaults";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, CustomEase);

// Mirrors --ease-out-quart in globals.css so CSS and JS motion share a curve.
CustomEase.create(EASE.out, "0.25,1,0.5,1");

gsap.defaults({ ease: EASE.out, duration: DUR.reveal });
gsap.config({ nullTargetWarn: false });
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, SplitText, useGSAP };
