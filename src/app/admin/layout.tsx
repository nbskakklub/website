import Script from "next/script";
import type { FC, PropsWithChildren } from "react";

export const metadata = {
  title: "Admin - NBSkak",
};

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  );
};

export default AdminLayout;