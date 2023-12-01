import Layout from "../components/Layout";
import Card from "../components/Card";
import HSeparator from "../components/HSeparator";
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from "gray-matter";
import fs from "fs";
import yaml from "js-yaml";
import React from 'react';
import HomeImage from "../components/HomeImage";

import styles from './page.module.scss';
import cx from "classnames";
import SeeMoreButton from "../components/SeeMoreButton";
import { makeMetadata } from "../lib/metadata";

export async function generateMetadata({ params }) {
  return await makeMetadata();
}

const components = { HSeparator };

export default async function Index() {
  const { title, source } = await getHomeContent();

  // We split the title into multiple parts to make it multiline
  const split_title = title.split(" ");


  return (
    <Layout>
      <HomeImage />
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.title}>
            {split_title.map(title_part =>
              <h1 key={title_part} className={styles.fancy_font}>{title_part}</h1>
            )
            }
          </div>
          <SeeMoreButton className={cx(styles.fancy_font, styles.poly_effect, styles.see_more)} toId="main-content"></SeeMoreButton>
        </div>
        <div className={styles.more} id="main-content">
          <div className={styles.more_content}>
            <div className={styles.cards} id="cards">
              <Card
                imagePath={"/images/skakudenfor.webp"}
                title="Klubaftener:"
                text="vær lørdag holder vi en klub aften for alle hvores medlemmer. Der kommer til at være"
              ></Card>
              <Card
                imagePath={"/images/skakudenfor.webp"}
                title="skak udenfor:"
                text="her ser i nogle personer som spiller skak uden for. det ser da meget hyggeligt ud. hvis du også"
                url="skakudenfor"
              ></Card>
            </div>

            <div className={styles.practical_information}>
              <MDXRemote source={source} components={components} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

async function getHomeContent(): Promise<{ title: string, source: string }> {
  const source = fs.readFileSync("content/pages/home.mdx", "utf8");
  const { content, data } = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  return {
    title: data.title,
    source: content,
  };
};

