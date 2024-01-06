import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";
import markdowntext from "./markdowntext";

const postsDirectory = path.join(process.cwd(), "content/posts");

export type PostContent = {
  readonly date: string;
  readonly title: string;
  readonly slug: string;
  readonly tags?: string[];
  readonly fullPath: string;
  readonly truncatedDescription: string;
};

let postCache: PostContent[];

export function fetchPostContent(): PostContent[] {
  if (postCache) {
    return postCache;
  }
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const { content, data } = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      data.truncatedDescription = `${markdowntext(content.slice(0,97))}...`
      const matterData = data as {
        date: string;
        title: string;
        tags?: string[];
        slug: string;
        fullPath: string;
        truncatedDescription: string;
      };
      matterData.fullPath = fullPath;
      if (!matterData.tags) {
        matterData.tags = [];
      }

      matterData.slug = fileName.replace(/\.mdx$/, "");

      return matterData;
    });
  // Sort posts by date
  postCache = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return postCache;
}

export function countPosts(tag?: string): number {
  return fetchPostContent().filter(
    (it) => !tag || (it.tags && it.tags.includes(tag))
  ).length;
}

export function listPostContent(
  page: number,
  limit: number,
  tag?: string
): PostContent[] {
  return fetchPostContent()
    .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}
