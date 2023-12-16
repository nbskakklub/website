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
            <nav>
            <ul>
                <li>
                    <a>
                        Om Nørrebro Skakklub
                    </a>
                </li>
                <li>
                    <a>Kalender</a>
                </li>
                <li>
                    <a>Nyheder</a>
                </li>
                <li>
                    <a>
                        Hall of Fame
                    </a>
                </li>

                </ul>
            </nav>
            <div className="container">
            <div className="head">
                <img
                    src="/images/clearoff.jpg"
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
                <div className="practical_information">
                    {children}
                </div>
                </div>
            </div>
            </div>
            <footer>
            <div className="container">
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