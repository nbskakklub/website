'use client'

import Link from "next/link";
import { usePathname } from 'next/navigation'
import Burger from "./Burger";
import { useState } from "react";


function activeClassname(pathName, path: string, subAllowed = true) {
  if (subAllowed) {
    return path.startsWith("/" + pathName) ? "active" : undefined
  } else {
    return path.endsWith("/" + pathName) ? "active" : undefined
  }
}
export default function Navigation() {
  var pathname = usePathname();
  if (pathname == null) { pathname = '' }
  const [active, setActive] = useState(false);
  return <>
    <Burger active={active} onClick={() => setActive(!active)} />
    <div className={"container " + (active ? "active" : "")}>
      <ul>
        <li>
          <Link href="/" legacyBehavior>
            <a className={activeClassname("", pathname, false)}>About</a>
          </Link>
        </li>
        <li>
          <Link href="/posts" legacyBehavior>
            <a
              className={
                activeClassname("posts", pathname)
              }
            >
              Nyheder
            </a>
          </Link>
        </li>
        <li>
          <Link href="/hall-of-fame" legacyBehavior>
            <a
              className={
                activeClassname("hall-of-fame", pathname)
              }
            >
              Hall of Fame
            </a>
          </Link>
        </li>
        <li>
          <Link href="/calendar" legacyBehavior>
            <a
              className={
                activeClassname("calendar", pathname)
              }
            >
              Kalender
            </a>
          </Link>
        </li>
      </ul>
      <style jsx>
        {`
          ul {
              display: flex;
              flex-direction: row;
              list-style: none;
              gap: 30px;
              justify-content: center;
              align-items: center;
          }
          .active ul {
            opacity: 1;
          }
          li {
            font-size: 2rem;
            
          }
          .active {
            color: #222;
          }

          @media (max-width: 769px) {
            .container {
              display: block;
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
  </>;
}
