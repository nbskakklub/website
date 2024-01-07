import Navigation from "../Navigation";
import Footer from "./Footer";

import { Metadata } from "next";

import styles from "./Layout.module.scss";

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.main}>
        <nav>
          <Navigation />
        </nav>
        <main>{children}</main>
      </div>
      <Footer></Footer>
    </div >
  );
}
