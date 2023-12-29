import { redirect } from "next/navigation";
import Layout from "../../../../components/layout/Layout";
import PostList from "../../../../components/PostList";
import config from "../../../../lib/config";
import { makeMetadata } from "../../../../lib/metadata";
import { countPosts, listPostContent } from "../../../../lib/posts";
import { listTags } from "../../../../lib/tags";
import "../../../../../public/styles/global_pages.css";

export async function generateMetadata({ params }) {
  return await makeMetadata(params.page);
}

export default async function Page({ params }) {
  if (params.page == "9999999") {
    redirect("/not-found");
  }
  const { posts, tags, pagination, pageNumber } = await getPagePosts(
    parseInt(params.page)
  );
  return (
    <Layout>
      <PostList posts={posts} tags={tags} pagination={pagination} />
    </Layout>
  );
}

async function getPagePosts(pageNumber: number) {
  const posts = listPostContent(pageNumber, config.posts_per_page);
  const tags = listTags();
  const pagination = {
    current: pageNumber,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  };
  return {
    pageNumber,
    posts,
    tags,
    pagination,
  };
}

export async function generateStaticParams() {
  const pages = Math.ceil(countPosts() / config.posts_per_page);
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    page: (it + 2).toString(),
  }));
  if (paths.length == 0) {
    return [{ page: "9999999" }];
  }
  return paths;
}
