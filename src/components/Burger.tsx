type Props = {
  active: boolean;
  onClick: () => void;
};
export default function Burger({ active, onClick }: Props) {
  return (
    <div>
      <div
        className={"container " + (active ? "active" : "")}
        onClick={onClick}
      >
        <div className={"meat meat-1"} />
        <div className={"meat meat-2"} />
        <div className={"meat meat-3"} />
      </div>

      {active && (
        <div className={"MobileNavBar"}>
          <div className={"ElementCotainer"}>
            <a href="/">Om Nørrebro Skakklub</a>
            <a href="/kalender">Kalender</a>
            <a href="/posts">Nyheder</a>
            <a href="/hall-of-fame">Hall of Fame</a>
          </div>
        </div>
      )}
      <style jsx>
        {`
          .ElementCotainer {
            display: flex;
            flex-direction: column;
          }

          .ElementCotainer a {
            padding: 2rem 1.25rem;
            border-top: 1px solid rgba(0, 0, 0, 0.224);
            font-size: 1.5rem;
          }

          .ElementCotainer:last-child {
            border-bottom: 1px solid rgba(0, 0, 0, 0.224);
          }

          .MobileNavBar {
            z-index: 2;
            background-color: white;
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            padding-top: 4.5rem;
          }
          .NavText1 {
            padding: 1rem 1rem;
            border-bottom: 1px solid #000; /* 1px solid black line */
            font-size: 1.5rem;
          }
          #firstnav {
            padding-top: 10px;
          }
          .container {
            position: relative;
            width: 38px;
            height: 38px;
            cursor: pointer;
            top: 1rem;
            left: 1.25rem;
            z-index: 3;
            background-color: rgba(255, 255, 255, 0.7);
            border-radius: 8px;
          }
          .meat {
            position: absolute;
            width: 28px;
            height: 2px;
            background: #222;
            top: calc(50% - 2px / 2);
            left: calc(50% - 28px / 2);
            transition: all 150ms ease-in;
          }
          .meat-1 {
            transform: translateY(-10px);
          }
          .meat-2 {
            width: calc(28px - 6px);
          }
          .meat-3 {
            transform: translateY(10px);
          }
          .active .meat-1 {
            transform: rotate(45deg);
          }
          .active .meat-2 {
            opacity: 0;
          }
          .active .meat-3 {
            transform: rotate(-45deg);
          }

          @media (min-width: 769px) {
            .container {
              display: none;
            }
          }
        `}
      </style>
    </div>
  );
}
