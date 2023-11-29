import config from "../../lib/config";

import { formatISO } from "date-fns";

import { Metadata } from 'next'

type Props = {
  url: string;
  title: string;
  keywords?: string[];
  date: Date;
  author?: string;
  image?: string;
  description?: string;
};

export async function generateMetadata({ url, title, keywords, date, author, image, description }: Props
): Promise<Metadata> {
  return {
    description: description,
    authors: [{name: author}],
    keywords: keywords ? undefined : keywords.join(","),
    other: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      mainEntityOfPage: config.base_url + url,
      headline: title,
      datePublished: formatISO(date),
      image: image,
    }
  }
}

export default function JsonLdMeta({ url, title, keywords, date, author, image, description }: Props) {}
