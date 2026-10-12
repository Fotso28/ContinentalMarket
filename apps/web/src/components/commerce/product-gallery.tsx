"use client";

import Image, { type StaticImageData } from "next/image";
import { useState } from "react";

/** Galerie : grande image en arche et vignettes. Un seul état local, pas de mouvement superflu. */
export function ProductGallery({ images, alt }: { images: StaticImageData[]; alt: string }) {
  const [index, setIndex] = useState(0);

  return (
    <div className="gallery">
      <div className="gallery-main">
        <Image src={images[index]} alt={alt} fill preload sizes="(max-width: 767px) 100vw, 46vw" />
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbs" role="group" aria-label="Photos du produit">
          {images.map((image, i) => (
            <button
              type="button"
              className="thumb"
              aria-label={`Afficher la photo ${i + 1} sur ${images.length}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => setIndex(i)}
              key={i}
            >
              <Image src={image} alt="" fill sizes="72px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
