import CmsPreviewBase from "./CmsPreviewBase";
import { format, formatISO } from "date-fns";

export default function Page({ title, date, author, tags, children }: { title: string, date: Date, author: string, tags?: string[], children: any }) {
    if (!date) {
        date = new Date("2023-35-27");
    }
    return (
        <CmsPreviewBase>
            <div className="more" id="main-content">
                <div className="more_content">
                    <div className="practical_information post_container">
                        <article>
                            <header>
                                <h1>{title}</h1>
                                <div className="metadata">
                                    <div>
                                    <time dateTime={formatISO(date)}>
                                        <span>{format(date, "LLLL d, yyyy")}</span>
                                    </time>
                                    </div>
                                    <div className="author">
                                        <span>{author}</span>
                                    </div>
                                </div>
                            </header>
                            <div className="post_content">{children}</div>
                            <ul className="tagList">
                                {tags?.map((it, i) => (
                                    <li key={i}>
                                        <a className="tagButton">{it}</a>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    </div>
                </div>
            </div>
        </CmsPreviewBase>
    )
}