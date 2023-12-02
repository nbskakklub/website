import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { fetchPostContent } from "../../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from "date-fns";
import PostLayout from "../../../components/PostLayout";
import { Metadata } from "next";
import { makeMetadata } from "../../../lib/metadata";

export type Props = {
  title: string;
  dateString: string;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  source: string;
};

const components = { };

const slugToPostContent = ((postContents) => {
  let hash = {};
  postContents.forEach((it) => (hash[it.slug] = it));
  return hash;
})(fetchPostContent());

export default async function Post({ params }) {
  const { title, dateString, slug, tags, author, description = "", source } = await getPostContent( params.post, slugToPostContent );
  return (
    <PostLayout
      title={title}
      date={parseISO(dateString)}
      slug={slug}
      tags={tags}
      author={author}
      description={description}
    >
      <MDXRemote source={source} components={components} />
    </PostLayout>
  );
}

export async function generateStaticParams() {
  return fetchPostContent().map((post) => ({
    post: post.slug,
  }));
};

export async function generateMetadata({ params }) {
  const source = fs.readFileSync(slugToPostContent[params.post].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  return await makeMetadata(data.title, `${content.slice(0, 72)}...`, data.author);
}

async function getPostContent( slug, slugToPostContent ) {
  const source = fs.readFileSync(slugToPostContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: {
      yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
    },
  });
  return {
    title: data.title,
    dateString: data.date,
    slug: data.slug,
    description: "",
    tags: data.tags ? data.tags : [],
    author: data.author,
    source: content,
  };
};
