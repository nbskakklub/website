// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import "../../public/styles/global.css";
import StyledComponentsRegistry from "./registry";

import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://nbskak.arctix.dev'),
  title: 'Nørrebro Skakklub',
  description: 'Den lokale skakklub på nørrebro',
  //verification: TODO
  applicationName: 'Nørrebro skakklub hjemmeside',
  authors: {
    name: 'Nørrebro skakklub',
    url: 'https://nbskak.dk'
  },
  category: 'chess club',
  creator: 'Nørrebro skakklub',
  icons: [{
    rel: 'icon',
    url: 'https://nbskak.arctix.dev/icon.png'
  },],
  keywords: ["skak", "chess", "skakklub", "chessclub", "nørrebro", "copenhagen", "social", "education", "entertainment", "games"],
  manifest: 'https://nbskak.arctix.dev/site.webmanifest',
  openGraph: {
    type: 'website',
    countryName: 'Denmark',
    description: 'Nørrebro skakklub hjemmeside',
    emails: 'kontakt@nbskak.dk',
    locale: 'da',
    title: 'Nørrebro skakklub forside',
    siteName: 'Nørrebro skakkklub',
    phoneNumbers: [''],
    images: [{
      url: 'https://nbskak.arctix.dev/images/skakudenfor.jpg',
      alt: 'Nogle folk sommer spiller skak udenfor',
    }, {
      url: 'https://nbskak.arctix.dev/images/chess-bg.jpg',
      alt: 'Et skakbræt på en orange baggrund med skakbrikker ligger rundt omkring',
    }],
  },
  twitter: {
    card: 'summary',
    title: 'Nørrebro skakklub',
    description: 'Den lokale skakklub på nørrebro',
    images: [{
      url: 'https://nbskak.arctix.dev/images/skakudenfor.jpg',
      alt: 'Nogle folk sommer spiller skak udenfor',
    }, {
      url: 'https://nbskak.arctix.dev/images/chess-bg.jpg',
      alt: 'Et skakbræt på en orange baggrund med skakbrikker ligger rundt omkring',
    }],
  }
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
