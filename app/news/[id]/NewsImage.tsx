// app/news/[id]/NewsImage.tsx
'use client'

import React, { useState } from 'react';
import Image from 'next/image';

interface NewsImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function NewsImage({ src, alt, className }: NewsImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  if (imageError) {
    return (
      <div className={`${className} imagePlaceholder`}>
        <span>Failed to load image</span>
      </div>
    );
  }

  return (
    <div className={`${className} imageWrapper`}>
      {imageLoading && (
        <div className="imageLoader">
          <span>Loading image...</span>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onError={() => {
          setImageError(true);
          setImageLoading(false);
        }}
        onLoad={() => setImageLoading(false)}
        style={{ display: imageLoading ? 'none' : 'block' }}
      />
    </div>
  );
}