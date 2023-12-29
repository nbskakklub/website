import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import { fetchPostContent } from "../../../lib/posts";
import fs from "fs";
import yaml from "js-yaml";
import { parseISO } from "date-fns";
import PostLayout from "../../../components/post/PostLayout";
import { makeMetadata } from "../../../lib/metadata";
import remarkGfm from "remark-gfm";
import "../../../../public/styles/global_pages.css";

export type Props = {
  title: string;
  dateString: string;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  source: string;
};

const slugToPostContent = ((postContents) => {
  let hash = {};
  postContents.forEach((it) => (hash[it.slug] = it));
  return hash;
})(fetchPostContent());

export default async function Post({ params }) {
  const { title, dateString, slug, tags, author, description = "", source } = await getPostContent(params.post, slugToPostContent);
  return (
    <PostLayout
      title={title}
      date={parseISO(dateString)}
      slug={slug}
      tags={tags}
      author={author}
      description={description}
    >
      <MDXRemote
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
        source={source}
      />
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

async function getPostContent(slug, slugToPostContent) {
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
