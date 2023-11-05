
type Props = {
    imagePath: string;
    text: string;
  };

export default function Card({ imagePath, text }: Props) {
    return (
      <>
        <div className="card">
            <img src={imagePath} alt="card-image" />
            <p>{text}</p>
        </div>
        <style jsx>
          {`
            .card {
                display: flex;
                flex-direction: column;
                gap: 20px;
                width: 4rem;
            }


            img {
                border-radius: 1rem;
            }
          `}
        </style>
      </>
    );
  }
  