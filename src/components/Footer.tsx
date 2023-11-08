export default function Footer() {
  return (
    <>
      <div className="container">

      </div>
      <style jsx>
        {`

          .container{
            background-image: url("/images/chess-bg.jpg");
            background-size: cover;
            background-position: bottom;
            height: 12rem;
            width: 100%;
            overflow: hidden;
          }

          .container::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            backdrop-filter: blur(10px); /* apply the blur */
            pointer-events: none; /* make the overlay click-through */
          }
          p {
            font-size: 0.75rem;
            text-align: center;
          }
        `}
      </style>
    </>
  );
}
