import { url } from "inspector";

type Props = {
    imagePath: string;
    text: string;
  };

export default function Card({ imagePath, text }: Props) {
    return (
      <>
        <div className="card">
          {/* <img src={imagePath} alt="card-image" /> */}
          <div className="img"></div>
          <p>{text}</p>
        </div>
        <style jsx>
          {`
            .card {
                display: flex;
                flex-direction: column;
                gap: 20px;
                min-width: 10rem;
            }


            .img {
              background-image: url(${imagePath});
              border-radius: 1rem;
              width: 100%;
              height: 100%;
              aspect-ratio: 1.5;
              background-size: cover;
              box-shadow: inset 2px 2px 20px 0 rgba(0, 0, 0, 0.3);
            }
          `}
        </style>
      </>
    );
  }
  