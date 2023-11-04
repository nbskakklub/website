import Link from "next/link";
import { NextRouter, useRouter } from "next/router";
import Burger from "./Burger";
import { useState } from "react";


function activeClassname(pathName, router: NextRouter, subAllowed = true) {
  if(subAllowed) {
    return router.pathname.startsWith("/" + pathName) ? "active" : null
  } else {
    return router.pathname.endsWith("/" + pathName) ? "active" : null
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
            <a className={activeClassname("", router, false)}>about</a>
          </Link>
        </li>
        <li>
          <Link href="/posts" legacyBehavior>
            <a
              className={
                activeClassname("posts", router)
              }
            >
              blog
            </a>
          </Link>
        </li>
        <li>
          <Link href="/turneringer" legacyBehavior>
            <a
              className={
                activeClassname("turneringer", router)
              }
            >
              turnaments
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

          @media (min-width: 769px) {
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
