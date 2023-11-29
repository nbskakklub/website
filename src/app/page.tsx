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
import classNames from "classnames";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://nbskak.arctix.dev'),
  title: 'Nørrebro Skakklub',
  description: 'Den lokale skakklub på nørrebro',
  //verification: TODO
  applicationName: 'Nørrebro skakklub hjemmeside',
  authors: {
    name: 'Nørrebro skakklub',
    url: 'https://nbskak.dk'
  },
  category: 'chess club',
  creator: 'Nørrebro skakklub',
  icons: [{
    rel: 'icon',
    url: 'https://nbskak.arctix.dev/icon.png'
  },],
  keywords: ["skak", "chess", "skakklub", "chessclub", "nørrebro", "copenhagen", "social", "education", "entertainment", "games"],
  manifest: 'https://nbskak.arctix.dev/site.webmanifest',
  openGraph: {
    type: 'website',
    countryName: 'Denmark',
    description: 'Nørrebro skakklub hjemmeside',
    emails: 'kontakt@nbskak.dk',
    locale: 'da',
    title: 'Nørrebro skakklub forside',
    siteName: 'Nørrebro skakkklub',
    phoneNumbers: [''],
    images: [{
      url: 'https://nbskak.arctix.dev/images/skakudenfor.jpg',
      alt: 'Nogle folk sommer spiller skak udenfor',
    }, {
      url: 'https://nbskak.arctix.dev/images/chess-bg.jpg',
      alt: 'Et skakbræt på en orange baggrund med skakbrikker ligger rundt omkring',
    }],
  },
  twitter: {
    card: 'summary',
    title: 'Nørrebro skakklub',
    description: 'Den lokale skakklub på nørrebro',
    images: [{
      url: 'https://nbskak.arctix.dev/images/skakudenfor.jpg',
      alt: 'Nogle folk sommer spiller skak udenfor',
    }, {
      url: 'https://nbskak.arctix.dev/images/chess-bg.jpg',
      alt: 'Et skakbræt på en orange baggrund med skakbrikker ligger rundt omkring',
    }],
  }
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
          <button className={classNames(styles.fancy_font, styles.poly_effect, styles.see_more)}>Se mere</button>
        </div>
        <div className={styles.more}>
          <div className={styles.more_content}>
            <div className={styles.cards}>
              <Card
                imagePath={"/images/skakudenfor.jpg"}
                title="Klubaftener:"
                text="vær lørdag holder vi en klub aften for alle hvores medlemmer. Der kommer til at være"
              ></Card>
              <Card
                imagePath={"/images/skakudenfor.jpg"}
                title="skak udenfor:"
                text="her ser i nogle personer som spiller skak uden for. det ser da meget hyggeligt ud. hvis du også"
                url="skakudenfor"
              ></Card>
            </div>

            <div className={styles.practical_information}>
              <MDXRemote source={source} components={components}/>
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
