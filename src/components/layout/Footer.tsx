import Link from "next/link";

import styles from "./Footer.module.scss";
export default function Footer() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.om}>
            <strong><p>Om Nørrebro skakklub</p></strong>
            <p>Med godt og vel 60 medlemmer er Nørrebro en af de største skakklubber i København, tillige har vi en stor juniorafdeling.Nørrebro Skakklub blev grundlagt i januar 2013</p>
          </div>
          <div>
            <strong><p>Adresse</p></strong>
            <p>Frejasgade 14</p>
            <p>2200 København</p>
          </div>
          <div>
            <strong><p>Kontakt</p></strong>
            <p>Kim Secher Andersen</p>

            <a href="mailto:kimsecher@gmail.com">
              <p>kimsecher@gmail.com</p>
            </a>
          </div>
          <div>
            <strong><p>Info</p></strong>
            <a href="/">
              <p>Om Nørrebro Skakklub</p>
            </a>
            <a href="/calendar">
              <p>Kalender</p>
            </a>
            <a href="/posts">
              <p>Nyheder</p>
            </a>
            <a href="/hall-of-fame">
              <p>Hall of Fame</p>
            </a>
          </div>
          <Link href="/admin">Admin</Link>
          <hr />
          <div className={styles.contentBottom}>
            <p>Copyright © 2023 Nørrebro Skakklub</p>|
            <a href="https://example.com/" className={styles.underlineEffect}>
              Created by TSDT
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
