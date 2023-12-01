'use client';
import { useEffect, useState } from "react";

import stlyes from '../app/page.module.scss';
import ExportedImage from "next-image-export-optimizer";

export default function HomeImage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
      const handleScroll = () => {
          setScrollY(window.scrollY);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  return (
    <ExportedImage className={stlyes.bg_img} style={{transform: `translateY(${-scrollY * 0.5}px)`}} src="/images/chess-bg.jpg" alt="Chess background" width={100} height={4271} />
  );
}
