import CMS, { TemplatePreviewProps } from "@staticcms/core";
import { useCallback, useEffect } from "react";
import '@staticcms/core/dist/main.css';

import config from "../../config";

import type { FC, ReactNode } from "react";

const CMSPage: FC = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      config.local_backend = true;
    }

    CMS.registerAdditionalLink({
      id: "external-link",
      title: "External link",
      data: "https://example.com/",
    });

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
      return(
        <input
          id={ field }
          className= { field.classNameWrapper }
          type="text"
          value={ value ? value : "" }
          onChange={ handleChange }
        />
      )
    };
    CMS.registerWidget("slug", SlugControl);

    interface PostEntry {
      title: string;
      date: ReactNode;
      body: ReactNode;
    }

    CMS.registerPreviewTemplate("posts", ({ widgetFor, entry }: TemplatePreviewProps<PostEntry>) => {
      console.log(entry);
      return(
        <div className="content">
          <h1>{entry.data.title}</h1>
          <time>{entry.data.date}</time>
          <div>{widgetFor('body')}</div>
        </div>
      )
    });

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