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
          <div className="img-container">
            <div className="img"></div>
          </div>
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
              height: 100%;
              width: 100%;
              background-size: cover;

              transform: scale(1);
            }
            .img-container {
              border-radius: 1rem;
              width: 100%;
              height: 100%;
              aspect-ratio: 1.5;
              
              overflow: hidden;
              transition: all 400ms;
              z-index: 10;
              box-shadow: 2px 2px 20px 0 rgb(255, 0, 0);

            }


            .img

            .img:hover {
              box-shadow: inset 2px 2px 20px 0 rgba(0, 0, 0, 0.6);

              background-scale

            }
          `}
        </style>
      </>
    );
  }
  