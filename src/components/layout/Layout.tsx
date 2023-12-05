import Navigation from "../Navigation";
import Footer from "./Footer";

import { Metadata } from "next";

import styles from "./Layout.module.scss";

export const metadata: Metadata = {
  themeColor: "#fff",
  applicationName: "Nørrebro skakklub",
  description: "Hjemmeside af Nørrebro skakklub",
  manifest: "/site.webmanifest",
  viewport: "width=device-width, initial-scale=1",
  icons: ["/icon.png"],
};

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className={styles.root}>
      <nav>
        <Navigation />
      </nav>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}
