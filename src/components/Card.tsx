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
            <div className="shadow"></div>
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

              transition: transform 350ms;
            }

            .shadow {
              width: 100%;
              height: 100%;
              position: absolute;
              box-shadow: inset 2px 2px 20px 0 rgb(0, 0, 0, .5);
              top: 0;
              transition: all 300ms;
            }

            .shadow:hover {
              box-shadow: inset 2px 2px 20px 0 rgb(0, 0, 0, .8);

            }

            .img-container {
              position: relative;
              border-radius: 1rem;
              width: 100%;
              height: 100%;
              aspect-ratio: 1.5;
              
              overflow: hidden;
              transition: all 400ms;
              z-index: 10;

            }

            .img-container:hover .img {
              transform: scale(1.1);
            }


          `}
        </style>
      </>
    );
  }
  