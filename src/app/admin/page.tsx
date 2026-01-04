"use client";

// Must be set before CMS is loaded to prevent config.yml fetch
if (typeof window !== 'undefined') {
  (window as any).CMS_MANUAL_INIT = true;
}

import dynamic from "next/dynamic";
import { FC, useMemo } from "react";

const Admin: FC = () => {
  const CMSPage = useMemo(
    () =>
      dynamic(() => import("../../components/cms/CMSPage"), {
        ssr: false,
      }),
    []
  );

  return useMemo(() => <CMSPage key="admin" />, [CMSPage]);
};

export default Admin;