"use client";
import { useEffect, useState } from "react";
import styles from "../app/page.module.scss";

export default function HomeImage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={styles.bg_img}
        style={{ transform: `translateY(${-scrollY * 0.7}px)` }}
      />
      {/* <style jsx>{`
        .bg_img {
          background-size: cover;
          transform-origin: bottom;
          width: 100%;
          z-index: 0;
          left: 0;
          top: 0;
          height: 100vh;
          position: fixed;
          filter: saturate(1.1) brightness(1.05);
        }
      `}</style> */}
    </>
  );
}
