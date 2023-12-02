'use client';
import { Button } from "@mui/joy";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container">
      <h2>404 - Vi fik vist lidt mat i vores træk! Undskyld rodet.</h2>
      <p>Uh-oh! Det ser ud til, at vi er gået glip af det træk. Denne side er vist et skakmat for forbindelsen!</p>
      <Button className="backButton"><Link href="/" className="backButton" >Gå tilbage</Link></Button>
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
          .backButton {
            margin-top: 5px;
            background-color: orange;
          }
        `}
      </style>
    </div>
  );
}