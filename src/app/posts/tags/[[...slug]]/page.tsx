import Layout from "../../../../components/layout/Layout";
import TagPostList from "../../../../components/TagPostList";
import config from "../../../../lib/config";
import { countPosts, listPostContent } from "../../../../lib/posts";
import { makeMetadata } from "../../../../lib/metadata";
import { getTag, listTags } from "../../../../lib/tags";
import { redirect } from "next/navigation";
import "../../../../../public/styles/global_pages.css";

export async function generateMetadata({ params }) {
  return await makeMetadata(params.slug + "tag");
}

export default async function Index({ params }) {
  if (params.slug == undefined) {
    redirect("/posts");
  }
  const { posts, tag, pagination, page } = await getTagInfo(
    params.slug as string[]
  );
  const url = `/posts/tags/${tag.name}` + (page ? `/${page}` : "");
  const title = tag.name;
  return (
    <Layout>
      <TagPostList posts={posts} tag={tag} pagination={pagination} />
    </Layout>
  );
}

async function getTagInfo(queries) {
  const [slug, page] = [queries[0], queries[1]];
  const posts = listPostContent(
    page ? parseInt(page as string) : 1,
    config.posts_per_page,
    slug
  );
  const tag = getTag(slug);
  const pagination = {
    current: page ? parseInt(page as string) : 1,
    pages: Math.ceil(countPosts(slug) / config.posts_per_page),
  };
  return {
    page,
    tag,
    pagination,
    posts,
  };
}

export async function generateStaticParams() {
  const paths: { slug: string[] }[] = [{ slug: [""] }];
  listTags().map((tag) => {
    paths.push({
      slug: [tag.slug],
    });
    const pages = Math.ceil(countPosts(tag.slug) / config.posts_per_page);
    for (let i = 0; i < pages - 1; i++) {
      paths.push({
        slug: [tag.slug, `${i + 2}`],
      });
    }
  });
  return paths;
}
