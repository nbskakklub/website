import Link from "next/link";
import { useRouter } from "next/router";
import Burger from "./Burger";
import { useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);
  return <>
    <Burger active={active} onClick={() => setActive(!active)} />
    <div className={"container " + (active ? "active" : "")}>
      <ul>
        <li>
          <Link href="/" legacyBehavior>
            <a className={router.pathname === "/" ? "active" : null}>about</a>
          </Link>
        </li>
        <li>
          <Link href="/posts" legacyBehavior>
            <a
              className={
                router.pathname.startsWith("/posts") ? "active" : null
              }
            >
              blog
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
