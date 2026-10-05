"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useState } from "react";

import groupLeadership from "../../public/images/landing/group-leadership.png";
import marketManager from "../../public/images/landing/market-manager.png";
import energyEngineer from "../../public/images/landing/energy-engineer.png";
import softwareArchitect from "../../public/images/landing/software-architect.png";
import pressingSpecialist from "../../public/images/landing/pressing-specialist.png";

type Portrait = { src: StaticImageData; alt: string };

const portraits: Record<string, Portrait> = {
  group: { src: groupLeadership, alt: "Direction Continental Group" },
  market: { src: marketManager, alt: "Responsable Continental Market" },
  energy: { src: energyEngineer, alt: "Expert Continental Energy" },
  software: { src: softwareArchitect, alt: "Expert Continental Software" },
  pressing: { src: pressingSpecialist, alt: "Experte Continental Pressing" },
};

const slots = [
  { className: "collage-market", sizes: "(max-width: 767px) 52vw, 18vw", sequence: ["market", "software", "pressing"] },
  { className: "collage-leader", sizes: "(max-width: 767px) 68vw, 27vw", sequence: ["group", "market", "energy"] },
  { className: "collage-energy", sizes: "(max-width: 767px) 46vw, 19vw", sequence: ["energy", "pressing", "group"] },
  { className: "collage-pressing", sizes: "(max-width: 767px) 44vw, 17vw", sequence: ["pressing", "energy", "software"] },
];

export function HeroCollage() {
  const [scene, setScene] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || reducedMotion.matches) return;

    const timer = window.setInterval(() => {
      setScene((current) => (current + 1) % 3);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <div
      className="hero-collage"
      aria-label="Les professionnels Continental Group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slots.map((slot, slotIndex) => (
        <div className={`collage-image ${slot.className}`} key={slot.className}>
          {slot.sequence.map((portraitKey, imageIndex) => {
            const portrait = portraits[portraitKey];
            return (
              <Image
                className={`collage-frame ${scene === imageIndex ? "is-active" : ""}`}
                src={portrait.src}
                alt={scene === imageIndex ? portrait.alt : ""}
                fill
                fetchPriority={slotIndex === 1 && imageIndex === 0 ? "high" : "auto"}
                sizes={slot.sizes}
                key={portraitKey}
              />
            );
          })}
        </div>
      ))}
      <div className="collage-progress" aria-hidden="true">
        {[0, 1, 2].map((item) => (
          <span className={scene === item ? "is-active" : ""} key={item} />
        ))}
      </div>
    </div>
  );
}
