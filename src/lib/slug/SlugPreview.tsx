import React from "react";

import { generateClassNames } from "./theming.util";

import type { StringField, WidgetPreviewProps } from "@staticcms/core";
import type { FC } from "react";

const classes = generateClassNames("WidgetStringPreview", ["root"]);

const SlugPreview: FC<WidgetPreviewProps<string, StringField>> = ({
  value = "",
}) => {
  return <div className={classes.root}>{value}</div>;
};

export default SlugPreview;
