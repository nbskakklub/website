export default function Page({ children }) {
    return (
        <div className="root">
            <nav className="navbar">
                <ul>
                    <li>
                        <a className="pointer">
                            Om Nørrebro Skakklub
                        </a>
                    </li>
                    <li>
                        <a className="pointer">Kalender</a>
                    </li>
                    <li>
                        <a className="pointer">Nyheder</a>
                    </li>
                    <li>
                        <a className="pointer">
                            Hall of Fame
                        </a>
                    </li>
                </ul>
            </nav>
            {children}
            <footer>
                <div className="footer_container">
                    <div className="content">
                    <div className="om">
                        <strong><p>Om Nørrebro skakklub</p></strong>
                        <p>Med godt og vel 60 medlemmer er Nørrebro en af de største skakklubber i København, tillige har vi en stor juniorafdeling.Nørrebro Skakklub blev grundlagt i januar 2013</p>
                    </div>
                    <div>
                        <strong><p>Adresse</p></strong>
                        <div className="adress">
                        <p>Frejasgade 14</p>
                        <p>2200 København</p>
                        </div>
                    </div>
                    <div>
                        <strong><p>Kontakt</p></strong>
                        <p>Kim Secher Andersen</p>

                        <a href="mailto:kimsecher@gmail.com">
                        <p>kimsecher@gmail.com</p>
                        </a>
                    </div>
                    <div>
                        <strong><p>Info</p></strong>
                        <a href="/">
                        <p>Om Nørrebro Skakklub</p>
                        </a>
                        <a href="/calendar">
                        <p>Kalender</p>
                        </a>
                        <a href="/posts">
                        <p>Nyheder</p>
                        </a>
                        <a href="/hall-of-fame">
                        <p>Hall of Fame</p>
                        </a>
                    </div>
                    <p className="copyright">Copyright © 2023 Nørrebro Skakklub</p>

                    <a href="https://example.com/" >
                        <p className="underlineEffect">Created by TSDT</p>
                    </a>
                    <a href="/admin"><p>Admin</p></a>
                    <a href="#top"><p>Til toppen ↑</p></a>
                    </div>
                </div>
            </footer>
        </div>
    )
}