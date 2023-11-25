import Layout from "../../../../components/Layout";
import TagPostList from "../../../../components/TagPostList";
import config from "../../../../lib/config";
import { countPosts, listPostContent } from "../../../../lib/posts";
import { getTag, listTags } from "../../../../lib/tags";
import { redirect } from "next/navigation";

export default async function Index({ params }) {
  if (params.slug == undefined) {
    redirect('/posts')
  }
  const { posts, tag, pagination, page } = await getTagInfo(params.slug as string[]);
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
    posts
  };
};

export async function generateStaticParams() {
  const paths = listTags().flatMap((tag) => {
    const pages = Math.ceil(countPosts(tag.slug) / config.posts_per_page);
    return Array.from(Array(pages).keys()).map((page) =>
      page === 0
        ? {
             slug: [tag.slug],
          }
        : {
            slug: [tag.slug, (page + 1).toString()],
          }
    );
  });
  paths.push({ slug: [''] });
  return paths;
};
