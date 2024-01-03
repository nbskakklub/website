import Layout from "../components/layout/Layout";
import Card from "../components/Card";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import fs from "fs";
import yaml from "js-yaml";
import React from "react";
import HomeImage from "../components/HomeImage";
import remarkGfm from "remark-gfm";

import "../../public/styles/global_pages.css";
import styles from "./page.module.scss";
import cx from "classnames";
import SeeMoreButton from "../components/SeeMoreButton";
import { makeMetadata } from "../lib/metadata";

export async function generateMetadata({ params }) {
  return await makeMetadata();
}

export default async function Index() {
  const { cards, title, subtitle, description, source } = await getHomeContent();

  // We split the title into multiple parts to make it multiline
  const split_title = title.split(" ");

  return (
    <Layout>
      <HomeImage />
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.title}>
            {split_title.map((title_part) => (
              <h1 key={title_part} className={styles.fancy_font}>
                {title_part}
              </h1>
            ))}
          </div>
          <p>
            Med godt og vel 60 medlemmer er Nørrebro en af de største
            skakklubber i København, tillige har vi en stor juniorafdeling.
            Nørrebro Skakklub blev grundlagt i januar 2013
          </p>
          <SeeMoreButton
            className={cx(
              styles.fancy_font,
              styles.poly_effect,
              styles.see_more
            )}
            toId="main-content"
          ></SeeMoreButton>

        </div>
        <div className={styles.more} id="main-content">
          <a
            className={styles.attribution}
            href="https://www.vecteezy.com/free-photos"
          >
            Free Stock photos by Vecteezy
          </a>
          <div className={styles.more_content}>

            <h1>{subtitle}</h1>
            <p>{description}</p>
            <div className={styles.cards} id="cards">
              <Card
                imagePath={cards[0].image}
                title={cards[0].title}
                text={cards[0].description}
                url={cards[0].link}
              ></Card>
              <Card
                imagePath={cards[1].image}
                title={cards[1].title}
                text={cards[1].description}
                url={cards[1].link}
              ></Card>
            </div>

            <div className={styles.mdx}>
              <MDXRemote
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm],
                  },
                }}
                components={{
                  table: (props) => (
                    <div className="table-responsive">
                      <table className="table" {...props} />
                    </div>
                  ),
                }}
                source={source}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

async function getHomeContent(): Promise<{ subtitle: string, description: string, title: string; source: string, cards: { title: string, description: string, image: string, link: string }[] }> {
  const source = fs.readFileSync("content/pages/index.mdx", "utf8");
  const { content, data } = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  return {
    title: data.title,
    cards: data.cards,
    subtitle: data.subtitle,
    description: data.description,
    source: content,
  };
}
