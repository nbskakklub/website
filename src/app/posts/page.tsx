import Layout from "../../components/Layout";
import PostList from "../../components/PostList";
import config from "../../lib/config";
import { makeMetadata } from "../../lib/metadata";
import { countPosts, listPostContent } from "../../lib/posts";
import { listTags } from "../../lib/tags";

export async function generateMetadata({ params }) {
  return await makeMetadata('Indlæg', 'Vores nyhedder og indlæg.');
}

export default async function Index() {
  const {posts, tags, pagination } = await getPosts(); 
  return (
    <Layout>
      <PostList posts={posts} tags={tags} pagination={pagination} />
    </Layout>
  );
}

async function getPosts() {
  const posts = listPostContent(1, config.posts_per_page);
  const tags = listTags();
  const pagination = {
    current: 1,
    pages: Math.ceil(countPosts() / config.posts_per_page),
  };
  return {
    posts,
    tags,
    pagination,
  };
};
