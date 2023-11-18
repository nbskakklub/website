import config from "../../lib/config";

import { Metadata } from 'next'

type Props = {
  title?: string;
  description?: string;
  keywords?: string[];
  author?: string;
  url: string;
};

export async function generateMetadata(
  { title, description, keywords, author, url }: Props
): Promise<Metadata> {
  return {
    title: "hey",
    description: description ? description : config.site_description,
    keywords: keywords
            ? keywords.join(",")
            : config.site_keywords.map((it) => it).join(","),
    authors: [{name: author ? author : null}],
    alternates: {
      canonical: config.base_url + url,
    },
  }
}

export default function BasicMeta({ title, description, keywords, author, url }: Props) {}