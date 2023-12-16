import CMS, { TemplatePreviewProps } from "@staticcms/core";
import { useCallback, useEffect } from "react";
import '@staticcms/core/dist/main.css';

import config from "../../lib/cmsconfig";

import type { FC } from "react";
import Image from "next/image";

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
      data: "http://www.skak.dk/",
    });

    CMS.registerPreviewTemplate("pages", ({ widgetFor, entry }: TemplatePreviewProps<PostEntry>) => {return (
        <>
          <header className="page_header">
            jadosdasduoh
          </header>
          <div className="page_content">
            <h2>{entry.data.title}</h2>
            {widgetFor("body")}
          </div>
          <footer>
            
          </footer>
        </>
    )});
    CMS.registerPreviewStyle("/styles/cms_preview_style.css");

    const SlugControl = ({ label, value, field, onChange }) => {
      const handleChange = useCallback(
        e => {
          onChange(e.target.value
            .replaceAll(/[^a-zA-Z0-9- ]/g, "")
            .replaceAll(" ", "-")
            .replaceAll(/-+/g, "-"));
        },
        [onChange],
      );
      return (
        <div className="CMS_Field_root CMS_WidgetString_root CMS_WidgetString_required CMS_Field_cursor-text" >
          <div className="CMS_Field_wrapper">
            <label className="CMS_Label_root CMS_Label_cursor-text CMS_Field_label">{label}</label>
            <div className="MuiInput-root CMS_TextField_root">
              <input
                className="MuiInput-input CMS_TextField_input CMS_WidgetString_input CMS_TextField_borderless CMS_TextField_cursor-default"
                id={field}
                type="text"
                value={value ? value : ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      )
    };
    CMS.registerWidget("slug", SlugControl);

    interface PostEntry {
      title: string;
      date: string;
      body: string;
      author: string;
      slug: string;
      tags: string[];
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