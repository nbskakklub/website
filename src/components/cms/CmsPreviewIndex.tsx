import Image from "next/image";
import { useState, useEffect } from "react";
import CmsPreviewBase from "./CmsPreviewBase";

export default function Page({ title, cards, children }) {
    const split_title = title.split(" ");
    return (
        <CmsPreviewBase hasBackground={true}>
            <div className="container">
            <div className="head">
                {/* eslint-disable-next-line @next/next/no-img-element*/}
                <img
                    src={"/images/clearoff.webp"}
                    alt="Nørrebro Skakklub"
                    className="bg_img"
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
            <div className="more_index" id="main-content">
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
        </CmsPreviewBase>
    )
}