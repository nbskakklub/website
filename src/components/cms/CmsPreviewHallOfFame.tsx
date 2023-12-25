import CmsPreviewBase from "./CmsPreviewBase";

export default function Page({ title, children }) {
    return (
        <CmsPreviewBase>
            <div className="more" id="main-content">
                <div className="more_content">
                    <div className="practical_information">
                    <h1>{title}</h1>
                        {children}
                    </div>
                </div>
            </div>
        </CmsPreviewBase>
    )
}