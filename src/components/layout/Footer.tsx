import footerData from "../../../meta/footer.yml";
import styles from "./Footer.module.scss";
import BackToTop from "../BackToTop";
import Link from "next/link";
import { Facebook } from "@mui/icons-material";

export default function Footer() {
  const split_adress = footerData.adress.split(", ");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.om}>
            <strong>
              <p>Om Nørrebro skakklub</p>
            </strong>
            <p>{footerData.description}</p>
          </div>
          <div className={styles.adresse}>
            <strong>
              <p>Adresse</p>
            </strong>
            <div className={styles.adress}>
              <p>{split_adress[0]}</p>
              <p>{split_adress[1]}</p>
            </div>
          </div>
          <div className={styles.kontakt}>
            <strong>
              <p>Kontakt</p>
            </strong>
            <p>{footerData.contact}</p>

            <a href={`mailto:${footerData.email}`}>
              <p>{footerData.email}</p>
            </a>

            <Link
              href="https://www.facebook.com/NorrebroSkakklub/"
              className={styles.facebook}
            >
              <Facebook sx={{ fontSize: '1.5rem' }} />
              <p>Facebook</p>
            </Link>
          </div>
          <div className={styles.info}>
            <strong>
              <p>Info</p>
            </strong>
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
          <p className={styles.copyright}>
            Copyright © {new Date().getFullYear()} Nørrebro Skakklub
          </p>

          <a href="https://example.com/">
            <p className={styles.underlineEffect}>Created by TSDT</p>
          </a>
          <a className={styles.admin} href="/admin">
            <p>Admin</p>
          </a>
          <BackToTop>
            <p>Til toppen ↑</p>
          </BackToTop>
        </div>
      </div>
    </>
  );
}
