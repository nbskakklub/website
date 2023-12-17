import { useState, useEffect } from "react";

export default function Page({ title, children }) {
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
                    src="/images/clearoff.jpg"
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
                            <div className="img"></div>
                            <div className="shadow"></div>
                        </div>
                            <span>
                            {"Klubaftener:" && <strong>{"Klubaftener:"}&nbsp;</strong>}
                            {"vær lørdag holder vi en klub aften for alle hvores medlemmer. Der kommer til at være"}...
                            <a>se mere</a>
                            </span>
                        </div>
                        <div className="card">
                            <div className="img-container">
                            <div className="img"></div>
                            <div className="shadow"></div>
                        </div>
                            <span>
                            {"skak udenfor:" && <strong>{"skak udenfor:"}&nbsp;</strong>}
                            {"her ser i nogle personer som spiller skak uden for. det ser da meget hyggeligt ud. hvis du også"}...
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
                    <a>Admin</a>
                    </div>
                    <hr />
                    <div className="contentBottom">
                    <p>Copyright © 2023 Nørrebro Skakklub</p>|
                    <a href="https://example.com/" className="underline-effect">
                        Created by TSDT
                    </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}