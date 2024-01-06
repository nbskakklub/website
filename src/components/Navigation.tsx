"use client";

import Link from "next/link";
import Burger from "./Burger";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const IsActive = (href) => {
    return usePathname() === '/' + href ? "activeLink" : "";
  };
  const [active, setActive] = useState(false);
  return (
    <>
      <Burger active={active} onClick={() => setActive(!active)} />
      <div className={"container " + (active ? "active" : "")}>
        {!active && (
          <ul>
            <li>
              <Link href="/" className={IsActive("")}>
                Om Nørrebro Skakklub
              </Link>
            </li>
            <li>
              <Link href="/calendar" className={IsActive("calendar")}>
                Kalender
              </Link>
            </li>
            <li>
              <Link href="/posts" className={IsActive("posts")}>
                Nyheder
              </Link>
            </li>
            <li>
              <Link href="/hall-of-fame" className={IsActive("hall-of-fame")}>
                Hall of Fame
              </Link>
            </li>
          </ul>
        )}
        <style jsx>
          {`
            .container {
              padding: 0 1.5rem;
              border-bottom: solid 1.5px rgba(0, 0, 0, 0.26);
            }

            ul {
              display: flex;
              flex-direction: row;
              list-style: none;
              gap: 30px;
              justify-content: start;
              align-items: center;
              margin-left: auto;
              margin-right: auto;
              max-width: 1200px;
              padding: 0;
            }
            li {
              font-size: 1.4rem;
            }
            @media (max-width: 769px) {
              .container {
                display: none;
              }
              ul {
                opacity: 1;
                padding: 0;
              }
              li {
                font-size: 1rem;
              }
            }
          `}
        </style>
      </div>
    </>
  );
}
