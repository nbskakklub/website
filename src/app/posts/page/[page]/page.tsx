import Layout from "../../../../components/Layout";
import PostList from "../../../../components/PostList";
import config from "../../../../lib/config";
import { countPosts, listPostContent } from "../../../../lib/posts";
import { listTags } from "../../../../lib/tags";

export default async function Page({ params }) {
  const { posts, tags, pagination, pageNumber } = await getPagePosts(parseInt(params.page));
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
};

export async function generateStaticParams() {
  const pages = Math.ceil(countPosts() / config.posts_per_page);
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    page: (it + 2).toString(),
  }));
  return paths;
};
