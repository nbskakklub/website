"use client"

export default function BackToTop(
    { children }: { children: React.ReactNode }
) {
    return (
        <>
            <a href="#top">{children}</a>
            <style jsx>
                {`
                a {
                    cursor: pointer;
                }
              `}
            </style>
        </>
    )

}