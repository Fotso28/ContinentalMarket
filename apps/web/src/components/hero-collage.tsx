"use client";

import Image, { type StaticImageData } from "next/image";
import { type CSSProperties, useEffect, useState } from "react";

import groupOffice from "../../public/images/landing/persona-group-office.png";
import marketManager from "../../public/images/landing/market-manager.png";
import energyKit from "../../public/images/landing/persona-energy-kit.png";
import softwareDesk from "../../public/images/landing/persona-software-desk.png";
import pressingSpecialist from "../../public/images/landing/pressing-specialist.png";

type Portrait = { src: StaticImageData; alt: string };

const portraits: Record<string, Portrait> = {
  group: { src: groupOffice, alt: "Homme assis à son bureau" },
  market: { src: marketManager, alt: "Responsable Continental Market" },
  energy: { src: energyKit, alt: "Homme auprès d’un équipement énergétique" },
  software: { src: softwareDesk, alt: "Homme travaillant sur un ordinateur" },
  pressing: { src: pressingSpecialist, alt: "Experte Continental Pressing" },
};

const slots = [
  { className: "collage-market", sizes: "(max-width: 767px) 46vw, 18vw", sequence: ["market", "software", "pressing"] },
  { className: "collage-leader", sizes: "(max-width: 767px) 54vw, 22vw", sequence: ["group", "market", "energy"] },
  { className: "collage-energy", sizes: "(max-width: 767px) 44vw, 20vw", sequence: ["energy", "pressing", "group"] },
  { className: "collage-pressing", sizes: "(max-width: 767px) 36vw, 16vw", sequence: ["pressing", "energy", "software"] },
];

const scenes = [0, 1, 2];

export function HeroCollage() {
  const [scene, setScene] = useState(0);
  // Les compositions 2 et 3 ne sont montées qu'une fois la page chargée :
  // le premier affichage ne télécharge que les quatre portraits visibles.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    if (document.readyState === "complete") {
      const frame = window.requestAnimationFrame(enable);
      return () => window.cancelAnimationFrame(frame);
    }
    window.addEventListener("load", enable, { once: true });
    return () => window.removeEventListener("load", enable);
  }, []);

  return (
    <div
      className="hero-collage"
      role="group"
      aria-label="Les professionnels Continental Group"
      data-ready={ready ? "" : undefined}
    >
      {slots.map((slot, slotIndex) => (
        <div
          className={`collage-image ${slot.className}`}
          style={{ "--i": slotIndex } as CSSProperties}
          key={slot.className}
        >
          {slot.sequence.map((portraitKey, imageIndex) => {
            if (imageIndex > 0 && !ready) return null;
            const portrait = portraits[portraitKey];
            return (
              <Image
                className={`collage-frame ${scene === imageIndex ? "is-active" : ""}`}
                src={portrait.src}
                alt={scene === imageIndex ? portrait.alt : ""}
                fill
                preload={slotIndex === 1 && imageIndex === 0}
                sizes={portraitKey === "group" ? "(max-width: 767px) 140vw, 70vw" : slot.sizes}
                quality={90}
                key={portraitKey}
              />
            );
          })}
        </div>
      ))}
      <div className="collage-progress">
        {scenes.map((item) => (
          <button
            type="button"
            className={scene === item ? "is-active" : ""}
            aria-label={`Afficher la composition ${item + 1} sur ${scenes.length}`}
            aria-pressed={scene === item}
            onClick={() => setScene(item)}
            key={item}
          >
            {/* La barre active se remplit en CSS ; sa fin déclenche la composition suivante. */}
            <span>
              {scene === item && <i onAnimationEnd={() => setScene((item + 1) % scenes.length)} />}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
