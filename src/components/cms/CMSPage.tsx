import CMS, { TemplatePreviewProps } from "@staticcms/core";
import { useEffect } from "react";
import '@staticcms/core/dist/main.css';

import config from "../../lib/cmsconfig";

import type { FC } from "react";
import Image from "next-export-optimize-images/image";
import CmsPreviewIndex from "./CmsPreviewIndex";
import CmsPreviewHallOfFame from './CmsPreviewHallOfFame';
import CmsPreviewPosts from './CmsPreviewPosts';
import CmsPreviewFooter from './CmsPreviewFooter';

import { slugControl, slugPreview, slugSchema } from "../../lib/slug";

const CMSPage: FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      config.local_backend = true;
    }
    CMS.registerIcon('dsu', () => <Image alt="DSU Logo" src="/images/dsu-logo.png" width="18" height="18" />);

    CMS.registerAdditionalLink({
      options: {
        icon: 'dsu',
      },
      id: "skak-link-turnering",
      title: "DSU Turneringssystem",
      data: "https://turnering.skak.dk/",
    });
    CMS.registerAdditionalLink({
      options: {
        icon: 'dsu',
      },
      id: "skak-link",
      title: "DSU",
      data: "https://www.skak.dk/",
    });

    CMS.registerPreviewTemplate("footer", ({ widgetFor, entry }: TemplatePreviewProps<FooterEntry>) => {
      return (
        <CmsPreviewFooter adress={entry.data.adress} description={entry.data.description} email={entry.data.email} contact={entry.data.contact} />
      )
    });

    CMS.registerPreviewTemplate("home", ({ widgetFor, entry }: TemplatePreviewProps<PageEntry>) => {
      return (
        <CmsPreviewIndex subtitle={entry.data.subtitle} description={entry.data.description} title={entry.data.title} cards={entry.data.cards} >{widgetFor('body')}</CmsPreviewIndex>
    )});

    CMS.registerPreviewTemplate("hall_of_fame", ({ widgetFor, entry }: TemplatePreviewProps<HallOfFameEntry>) => {
      return (
        <CmsPreviewHallOfFame title={entry.data.title} >{widgetFor('body')}</CmsPreviewHallOfFame>
    )});

    CMS.registerPreviewTemplate("posts", ({ widgetFor, entry }: TemplatePreviewProps<PostEntry>) => {
      return (
        <CmsPreviewPosts title={entry.data.title} author={entry.data.author} date={new Date(entry.data.date || null)} tags={entry.data.tags}>{widgetFor('body')}</CmsPreviewPosts>
    )});

    CMS.registerPreviewStyle("/styles/cms_preview_style.css");
    CMS.registerPreviewStyle("/styles/global.css");

    CMS.registerWidget('slug', slugControl, slugPreview, slugSchema as any);

    interface PostEntry {
      title: string;
      date: string;
      body: string;
      author: string;
      slug: string;
      tags: string[];
    }

    interface PageEntry {
      title: string;
      subtitle: string;
      description: string;
      cards: { title: string, description: string, image: string, url: string }[];
      body: string;
    }

    interface HallOfFameEntry {
      title: string;
      body: string;
    }

    interface FooterEntry {
      contact: string;
      adress: string;
      email: string;
      description: string;
    }

    CMS.init({ config });
  }, []);

  return (
    <div>
      <style jsx global>{`
        html,
        body {
          height: 100%;
        }

        #__next {
          display: none;
        }
      `}</style>
    </div>
  );
};

CMSPage.displayName = "CMSPage";

export default CMSPage;