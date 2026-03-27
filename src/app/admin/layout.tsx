import type { FC, PropsWithChildren } from "react";

export const metadata = {
  title: "Admin - NBSkak",
};

const AdminLayout: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default AdminLayout;