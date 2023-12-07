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
    <div
      className={styles.bg_img}
      style={{ transform: `translateY(${-scrollY * 0.5}px)` }}
    ></div>
  );
}
