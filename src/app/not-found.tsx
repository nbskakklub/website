import { Button } from "@mui/material";
import Link from "next/link";
import styles from './not-found.module.scss';

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h2>404 - Trækmisforståelse!</h2>
      <p>Uh-oh! Det ser ud til, at vi er gået glip af det træk. Denne side er vist et skakmat for forbindelsen!</p>
      <Link href='/'><Button size='large' variant="contained" className={styles.button}>Gå tilbage</Button></Link>
    </div>
  );
}