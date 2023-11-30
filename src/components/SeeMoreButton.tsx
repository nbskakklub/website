'use client';

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