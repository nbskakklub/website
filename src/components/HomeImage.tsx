"use client";
import { useEffect, useState } from "react";

import styles from "../app/page.module.scss";

export default function HomeImage() {
  return (
    <>
      <div
        className={styles.bg_img}
      ></div>
      <style jsx>

        {`
          div {
            animation: parralax linear;
            animation-timeline: scroll();
            animation-range-end: 2000px;
          }

          @keyframes parralax {
            to: {transform: translateY(-1000px)}
          }
        `}
      </style>
    </>

  );
}
