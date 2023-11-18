// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import "../../public/styles/global.css";
import StyledComponentsRegistry from "./registry";
 

export const metadata = {
  title: 'Nørrebro skakklub',
  description: 'Nørrebro skakklub hjemmeside',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da">
        <body>
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </body>
    </html>
  )
}
