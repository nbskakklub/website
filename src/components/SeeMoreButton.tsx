'use client';

import { url } from "inspector";
import styles from './page.module.scss';
import classNames from "classnames";

type Props = {
  className: string;
};

export default function SeeMoreButton({ className }: Props) {
  function seeMore() {
    let element = document.getElementById("cards")
    element.scrollIntoView({ behavior: "smooth", block: 'start' })
  }

  return (
    <button className={className} onClick={seeMore}>Se mere</button>
  );
}