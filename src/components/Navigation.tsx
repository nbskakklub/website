import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import Burger from "./Burger";
import { useState } from "react";


function activeClassname(pathName, router: NextRouter, subAllowed = true) {
  if(subAllowed) {
    return router.pathname.startsWith("/" + pathName) ? "active" : undefined
  } else {
    return router.pathname.endsWith("/" + pathName) ? "active" : undefined
  }
}
export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  return <>
    <Burger active={active} onClick={() => setActive(!active)} />
    <div className={"container " + (active ? "active" : "")}>
      <ul>
        <li>
          <Link href="/" legacyBehavior>
            <a className={activeClassname("", router, false)}>About</a>
          </Link>
        </li>
        <li>
          <Link href="/posts" legacyBehavior>
            <a
              className={
                activeClassname("posts", router)
              }
            >
              Blog
            </a>
          </Link>
        </li>
        <li>
          <Link href="/turnaments" legacyBehavior>
            <a
              className={
                activeClassname("turnaments", router)
              }
            >
              Turneringer
            </a>
          </Link>
        </li>
        <li>
          <Link href="/calendar" legacyBehavior>
            <a
              className={
                activeClassname("calendar", router)
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
