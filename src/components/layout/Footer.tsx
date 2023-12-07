import Link from "next/link";

import styles from "./Footer.module.scss";
export default function Footer() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <Link href="/admin">Admin</Link>
        </div>
        <hr />
        <div className={styles.contentBottom}>
          <p>Copyright © 2023 Nørrebro Skakklub</p>|
          <a href="https://example.com/" className="underline-effect">
            Created by TSDT
          </a>
        </div>
      </div>
    </>
  );
}
