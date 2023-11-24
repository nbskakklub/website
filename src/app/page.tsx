import Layout from "../components/Layout";
import Card from "../components/Card";
import HSeparator from "../components/HSeparator";
import { MDXRemote } from 'next-mdx-remote/rsc'
import matter from "gray-matter";
import fs from "fs";
import yaml from "js-yaml";
import React from 'react';
import HomeImage from "../components/HomeImage";

import './page.scoped.scss';

const components = { HSeparator };

export default async function Index() {
  const { title, source } = await getHomeContent();

  const titles = title.split(" ");

  return (
    <Layout>
      <HomeImage />
      <div className="container">
        <div className="head">
          <div className="title">
            {titles.map(element => 
              <h1 key={element} className="fancy-font">{element}</h1>
              )
            }
          </div>
          <button className="fancy-font poly-effect see-more">Se mere</button>
        </div>
        <div className="more">
          <div className="more-content">
            <div className="cards">
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

            <div className="practical-information">
              <MDXRemote source={source} components={components}/>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

async function getHomeContent() {
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
