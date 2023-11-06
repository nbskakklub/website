import CMS from "@staticcms/core";
import { useCallback, useEffect } from "react";
import '@staticcms/core/dist/main.css';

import config from "../../config";

import type { FC } from "react";

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