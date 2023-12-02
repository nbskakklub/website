'use client';
import { Button } from "@mui/joy";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <h2>404 - Trækmisforståelse!</h2>
      <p>Uh-oh! Det ser ud til, at vi er gået glip af det træk. Denne side er vist et skakmat for forbindelsen!</p>
      <Link href='/'><Button size='lg' sx={{ marginTop: 2, backgroundColor: 'orange', ':hover': { backgroundColor: 'rgb(255, 140, 0)' } }} >Gå tilbage</Button></Link>
      <style jsx>
        {`
          .container {
            flex-direction: column;
            height: 100%;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
          }
        `}
      </style>
    </div>
  );
}