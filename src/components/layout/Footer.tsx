import footerData from "../../../meta/footer.yml";
import styles from "./Footer.module.scss";
import BackToTop from "../BackToTop";
import Link from "next/link";
import { Facebook } from "@mui/icons-material";

export default function Footer() {
  const split_adress = footerData.adress.split(", ");
  return (
    <>
      <footer className={styles.container}>
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
              <p>Sociale medier</p>
            </strong>
            <Link
              href="https://www.facebook.com/NorrebroSkakklub/"
              className={styles.facebook}
            >
              <Facebook sx={{ fontSize: "1.5rem" }} />
              <p>Facebook</p>
            </Link>
          </div>
          <div className={styles.info}>
            <strong>
              <p>Info</p>
            </strong>
            <Link href="/">
              <p>Om Nørrebro Skakklub</p>
            </Link>
            <Link href="/kalender">
              <p>Kalender</p>
            </Link>
            <Link href="/posts">
              <p>Nyheder</p>
            </Link>
            <Link href="/hall-of-fame">
              <p>Hall of Fame</p>
            </Link>
          </div>
          <p className={styles.copyright}>
            Copyright © {new Date().getFullYear()} Nørrebro Skakklub
          </p>

          <Link href="https://novusgroup.dk/">
            <p className={styles.underlineEffect}>Created by Novus Group</p>
          </Link>
          <Link className={styles.admin} href="/admin">
            <p>Admin</p>
          </Link>
          <BackToTop>
            <p>Til toppen ↑</p>
          </BackToTop>
        </div>
      </footer>
    </>
  );
}
