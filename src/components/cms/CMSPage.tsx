import CMS from "decap-cms-app";
import { useEffect } from "react";

import config from "../../lib/cmsconfig";

import type { FC } from "react";
import type { PreviewTemplateComponentProps } from "decap-cms-core";
import CmsPreviewIndex from "./CmsPreviewIndex";
import CmsPreviewHallOfFame from './CmsPreviewHallOfFame';
import CmsPreviewPosts from './CmsPreviewPosts';
import CmsPreviewFooter from './CmsPreviewFooter';

// Helper to get data from Immutable Map entry
const getEntryData = (entry: PreviewTemplateComponentProps['entry']): Record<string, unknown> => {
  const data = entry.get('data');
  if (data && typeof data.toJS === 'function') {
    return data.toJS();
  }
  return data as Record<string, unknown>;
};

const CMSPage: FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      config.local_backend = true;
    }

    CMS.registerPreviewTemplate("footer", ({ widgetFor, entry }) => {
      const data = getEntryData(entry);
      return (
        <CmsPreviewFooter
          adress={data.adress as string}
          description={data.description as string}
          email={data.email as string}
          contact={data.contact as string}
        />
      );
    });

    CMS.registerPreviewTemplate("home", ({ widgetFor, entry }) => {
      const data = getEntryData(entry);
      return (
        <CmsPreviewIndex
          subtitle={data.subtitle as string}
          description={data.description as string}
          title={data.title as string}
          cards={data.cards as { title: string, description: string, image: string, link: string }[]}
        >
          {widgetFor('body')}
        </CmsPreviewIndex>
      );
    });

    CMS.registerPreviewTemplate("hall_of_fame", ({ widgetFor, entry }) => {
      const data = getEntryData(entry);
      return (
        <CmsPreviewHallOfFame title={data.title as string}>
          {widgetFor('body')}
        </CmsPreviewHallOfFame>
      );
    });

    CMS.registerPreviewTemplate("posts", ({ widgetFor, entry }) => {
      const data = getEntryData(entry);
      const rawTags = data.tags as { tag: string }[] | undefined;
      const tags = rawTags?.map(t => t.tag);
      return (
        <CmsPreviewPosts
          title={data.title as string}
          author={data.author as string}
          date={new Date(data.date as string || Date.now())}
          tags={tags}
        >
          {widgetFor('body')}
        </CmsPreviewPosts>
      );
    });

    CMS.registerPreviewStyle("/styles/cms_preview_style.css");
    CMS.registerPreviewStyle("/styles/global.css");

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