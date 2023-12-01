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
            background-color: #f6bc3f;
            background-size: cover;
            background-position: bottom;
            height: 7rem;
            width: 100%;
            overflow: hidden;
            position: relative;
            z-index: 4;
            padding-top: 1rem;
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
            bottom: 0.5rem;
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
