import Script from "next/script";
import type { FC, PropsWithChildren } from "react";

export const metadata = {
  title: "Admin - Next.js Static CMS Blog",
};

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
};

export default AdminLayout;