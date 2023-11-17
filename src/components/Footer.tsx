import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="container">
        <div className="content">
          <Link href="/admin">Admin</Link>
        </div>
        <hr />
        <div className="content-bottom">
          <p>Copyright © 2023 Nørrebro Skakklub</p>
          |
          <a href="https://example.com/" className="underline-effect" >Created by TSDT</a>
        </div>
      </div>
      <style jsx>
        {`
          hr { 
            display: block;
            position: relative;
            margin-top: auto;
            margin-bottom: 0.5em;
            margin-left: auto;
            height: 1px;
            width: 500px;
            background-color: black;
            margin-right: auto;
            border: none;
            z-index: 1;
            bottom: 0px;
          }
          .container {
            background-image: url("/images/chess-bg.jpg");
            background-size: cover;
            background-position: bottom;
            height: 8rem;
            width: 100%;
            overflow: hidden;
            position: relative;
          }

          .underline-effect::after {
            content: "";
            height: 0.1vw;
            width: 0%;
            background-color: rgb(1, 1, 1);
            display: block;
            position: absolute;
            transition: width 500ms;
          }

          .underline-effect:hover::after {
            width: 9vh;
          }

          .container::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(20px);
            pointer-events: none;
            background-color: rgba(0, 0, 0, 0.4);
          }

          .content {
            height: max-content;
            position: relative;
            text-align: center;
            z-index: 1;
          }

          .content-bottom {
            position: absolute;
            width: 100%;
            align-content: center;
            text-align: center;
            z-index: 1;
            bottom: 0;
          }
          .content-bottom * {
            display: inline-block;
            margin-left: 10px;
            margin-right: 10px;
            font-size: 1rem;
            color: black;
          }
        `}
      </style>
    </>
  );
}
