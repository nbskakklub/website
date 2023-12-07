"use client";
import React from "react";
import styles from "../../../public/styles/content.module.css";
import Author from "../Author";
import Date from "../Date";
import Layout from "../layout/Layout";
import TagButton from "../TagButton";
import { getAuthor } from "../../lib/authors";
import { getTag } from "../../lib/tags";
import HSeparator from "../HSeparator";
import moreStyles from "../post/PostLayout.module.scss";

type Props = {
  title: string;
  date: Date;
  slug: string;
  tags?: string[];
  author: string;
  description?: string;
  children: React.ReactNode;
};
export default function PostLayout({
  title,
  date,
  slug,
  author,
  tags,
  description = "",
  children,
}: Props) {
  if (!tags) {
    tags = [];
  }
  const authorName = getAuthor(author);
  return (
    <Layout>
      <div className={moreStyles.container}>
        <article>
          <header>
            <h1>{title}</h1>
            <div className={moreStyles.metadata}>
              <div>
                <Date date={date} />
              </div>
              <div className="author">
                <Author author={authorName} />
              </div>
            </div>
          </header>
          <div className={styles.content}>{children}</div>
          <ul className={moreStyles.tagList}>
            {tags.map((it, i) => (
              <li key={i}>
                <TagButton tag={getTag(it)} />
              </li>
            ))}
          </ul>
        </article>
      </div>
    </Layout>
  );
}
