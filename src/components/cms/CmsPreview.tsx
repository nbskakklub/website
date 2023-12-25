import Image from "next/image";
import { useState, useEffect } from "react";

export default function Page({ title, cards, children }) {
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

    const split_title = title.split(" ");
    return (
        <div className="root">
            <nav className="navbar">
                <ul>
                    <li>
                        <a className="pointer">
                            Om Nørrebro Skakklub
                        </a>
                    </li>
                    <li>
                        <a className="pointer">Kalender</a>
                    </li>
                    <li>
                        <a className="pointer">Nyheder</a>
                    </li>
                    <li>
                        <a className="pointer">
                            Hall of Fame
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="container">
            <div className="head">
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img
                    src={"/images/clearoff.webp"}
                    alt="Nørrebro Skakklub"
                    className="bg_img"
                    style={{ transform: `translateY(${-scrollY * 0.5}px)` }}
                ></img>
                <div className="title">
                {split_title.map((title_part) => (
                    <h1 key={title_part} className="fancy_font">
                    {title_part}
                    </h1>
                ))}
                </div>
                <button className="fancy_font
                    poly_effect
                    see_more">Se mere</button>
            </div>
            <div className="more" id="main-content">
                <div className="more_content">
                    <div className="cards">
                        <div className="card">
                            <div className="img-container">
                            <Image className="img" width={10} height={10} alt={cards[0].title} src={cards[0].image} />
                            <div className="shadow"></div>
                        </div>
                            <span>
                            {cards[0].title && <strong>{cards[0].title}&nbsp;</strong>}
                            {cards[0].description}...
                            <a>se mere</a>
                            </span>
                        </div>
                        <div className="card">
                            <div className="img-container">
                            <Image className="img" width={10} height={10} alt={cards[1].title} src={cards[1].image} />
                            <div className="shadow"></div>
                        </div>
                            <span>
                            {cards[1].title && <strong>{cards[1].title}&nbsp;</strong>}
                            {cards[1].description}...
                            <a>se mere</a>
                            </span>
                        </div>
                    </div>
                <div className="practical_information">
                    {children}
                </div>
                </div>
            </div>
            </div>
            <footer>
                <div className="footer_container">
                    <div className="content">
                    <div className="om">
                        <strong><p>Om Nørrebro skakklub</p></strong>
                        <p>Med godt og vel 60 medlemmer er Nørrebro en af de største skakklubber i København, tillige har vi en stor juniorafdeling.Nørrebro Skakklub blev grundlagt i januar 2013</p>
                    </div>
                    <div>
                        <strong><p>Adresse</p></strong>
                        <div className="adress">
                        <p>Frejasgade 14</p>
                        <p>2200 København</p>
                        </div>
                    </div>
                    <div>
                        <strong><p>Kontakt</p></strong>
                        <p>Kim Secher Andersen</p>

                        <a href="mailto:kimsecher@gmail.com">
                        <p>kimsecher@gmail.com</p>
                        </a>
                    </div>
                    <div>
                        <strong><p>Info</p></strong>
                        <a href="/">
                        <p>Om Nørrebro Skakklub</p>
                        </a>
                        <a href="/calendar">
                        <p>Kalender</p>
                        </a>
                        <a href="/posts">
                        <p>Nyheder</p>
                        </a>
                        <a href="/hall-of-fame">
                        <p>Hall of Fame</p>
                        </a>
                    </div>
                    <p className="copyright">Copyright © 2023 Nørrebro Skakklub</p>

                    <a href="https://example.com/" >
                        <p className="underlineEffect">Created by TSDT</p>
                    </a>
                    <a href="/admin"><p>Admin</p></a>
                    <a href="#top"><p>Til toppen ↑</p></a>
                    </div>
                </div>
            </footer>
        </div>
    )
}