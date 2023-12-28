import Layout from "../../components/layout/Layout";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import fs from "fs";
import yaml from "js-yaml";
import React from "react";

import styles from "./page.module.scss";
import { makeMetadata } from "../../lib/metadata";
import remarkGfm from "remark-gfm";

export async function generateMetadata({ params }) {
  return await makeMetadata();
}
export default async function Index() {
  const { title, source } = await getHomeContent();
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.content}>
          <div>
            <h2 className={styles.title}>{title}</h2>
          </div>
          <div>
            <MDXRemote options={
              {
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                },
              }
            } source={source} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

async function getHomeContent(): Promise<{ title: string; source: string }> {
  const source = fs.readFileSync("content/pages/hall-of-fame.mdx", "utf8");
  const { content, data } = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  return {
    title: data.title,
    source: content,
  };
}
