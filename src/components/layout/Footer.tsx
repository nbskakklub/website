import footerData from "../../../meta/footer.yml";
import styles from "./Footer.module.scss";
import BackToTop from "../BackToTop";
import FacebookLogo from "../../../public/images/facebook.svg";

export default function Footer() {
  const split_adress = footerData.adress.split(", ");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.om}>
            <strong><p>Om Nørrebro skakklub</p></strong>
            <p>{footerData.description}</p>
          </div>
          <div className={styles.adresse}>
            <strong><p>Adresse</p></strong>
            <div className={styles.adress}>
              <p>{split_adress[0]}</p>
              <p>{split_adress[1]}</p>
            </div>
          </div>
          <div className={styles.kontakt}>
            <strong><p>Kontakt</p></strong>
            <p>{footerData.contact}</p>

            <a href={`mailto:${footerData.email}`}>
              <p>{footerData.email}</p>
            </a>

            <a className={styles.facebook}>
              <svg viewBox="0 0 24 24" style={{ height: '35px', width: '35px' }}>
                <path fill="currentColor" d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"></path>
              </svg>
              <p>Facebook</p>
            </a>
          </div>
          <div className={styles.info}>
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
          <p className={styles.copyright}>Copyright © {new Date().getFullYear()} Nørrebro Skakklub</p>

          <a href="https://example.com/" >
            <p className={styles.underlineEffect}>Created by TSDT</p>
          </a>
          <a className={styles.admin} href="/admin"><p>Admin</p></a>
          <BackToTop>
            <p>Til toppen ↑</p>
          </BackToTop>
        </div>
      </div >
    </>
  );
}
