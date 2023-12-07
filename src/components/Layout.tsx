import Navigation from "./Navigation";
import Footer from "./Footer";

import styles from './layout.module.scss';

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className={styles.root}>
      <nav className={styles.navi}>
        <Navigation />
      </nav>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}
