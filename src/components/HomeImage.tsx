"use client";
import { useEffect, useState } from "react";
import styles from "../app/page.module.scss";

export default function HomeImage() {

  useEffect(() => {
    const handleScroll = () => {
      document.getElementById("bg_img").style.transform = `translateY(${-window.scrollY * 0.7}px)`;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        id="bg_img"
        className={styles.bg_img}
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
