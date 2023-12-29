import CmsPreviewFooter from "./CmsPreviewFooter";
import footerData from  "../../../meta/footer.yml";

export default function Page({ hasBackground=false, children }: { hasBackground?: boolean, children: any }) {
    return (
        <div className={hasBackground ? "" : "root"}>
            <nav className="navbar">
                <ul className="special_ul">
                    <li className="special_li">
                        <a className="pointer">
                            Om Nørrebro Skakklub
                        </a>
                    </li>
                    <li className="special_li">
                        <a className="pointer">Kalender</a>
                    </li>
                    <li className="special_li">
                        <a className="pointer">Nyheder</a>
                    </li>
                    <li className="special_li">
                        <a className="pointer">
                            Hall of Fame
                        </a>
                    </li>
                </ul>
            </nav>
            {children}
            <CmsPreviewFooter {...footerData} />
        </div>
    )
}