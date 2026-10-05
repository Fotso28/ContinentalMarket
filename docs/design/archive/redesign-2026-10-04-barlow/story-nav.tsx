"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Chapter = { id: string; name: string; subject: string };

export function StoryNav({ chapters }: { chapters: Chapter[] }) {
  const rail = useRef<HTMLElement>(null);
  const [active, setActive] = useState(chapters[0].id);

  useGSAP(() => {
    const triggers = chapters.map((chapter) => {
      const target = document.querySelector<HTMLElement>('[data-story-chapter="' + chapter.id + '"]');
      if (!target) return null;
      return ScrollTrigger.create({
        trigger: target,
        start: "top 48%",
        end: "bottom 48%",
        onEnter: () => setActive(chapter.id),
        onEnterBack: () => setActive(chapter.id),
      });
    });
    return () => triggers.forEach((trigger) => trigger?.kill());
  }, { scope: rail });

  return (
    <aside className="story-rail" ref={rail} aria-label="Les métiers Continental">
      <p>Nos métiers</p>
      <nav aria-label="Aller à un métier">
        {chapters.map((chapter) => (
          <a href={"#" + chapter.id} className={active === chapter.id ? "is-active" : ""} key={chapter.id} aria-current={active === chapter.id ? "location" : undefined}>
            <span>{chapter.name}</span><small>{chapter.subject}</small>
          </a>
        ))}
      </nav>
      <span className="story-rail-foot">Continental Group · Douala</span>
    </aside>
  );
}

