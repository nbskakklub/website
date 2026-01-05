import { Facebook } from "@mui/icons-material";
import Link from "next/link";

type Props = {
  email: string;
  adress: string;
  description: string;
  contact: string;
};

export default function Page({ email, adress, description, contact }: Props) {
  const split_adress = adress.split(", ");
  return (
    <footer>
      <div className="footer_container">
        <div className="content">
          <div className="om">
            <strong>
              <p>Om Nørrebro skakklub</p>
            </strong>
            <p>{description}</p>
          </div>
          <div>
            <strong>
              <p>Adresse</p>
            </strong>
            <div className="adress">
              <p>{split_adress[0]}</p>
              <p>{split_adress[1]}</p>
            </div>
          </div>
          <div>
            <strong>
              <p>Sociale medier</p>
            </strong>
            <Link
              href="https://www.facebook.com/NorrebroSkakklub/"
              className="facebook"
            >
              <Facebook sx={{ fontSize: "2rem" }} />
              <p>Facebook</p>
            </Link>
          </div>
          <div>
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
          <p className="copyright">
            Copyright © {new Date().getFullYear()} Nørrebro Skakklub
          </p>

          <Link href="https://novusgroup.dk/">
            <p className="underlineEffect">Created by Novus Group</p>
          </Link>
          <Link href="/admin">
            <p>Admin</p>
          </Link>
          <Link href="#top">
            <p>Til toppen ↑</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}
