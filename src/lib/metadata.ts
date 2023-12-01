import { Metadata } from "next";

export async function makeMetadata(title?: string, description?: string, author?: string) {
  const metadata: Metadata = {
    metadataBase: new URL('https://nbskak.arctix.dev'),
    title: title ? `${title} | Nørrebro Skakklub` : 'Nørrebro Skakklub',
    description: description ? description : 'Den lokale skakklub på nørrebro',
    //verification: TODO
    applicationName: 'Nørrebro skakklub Hjemmeside',
    authors: author ? {
      name: author,
      url: 'https://nbskak.dk'
    } : {
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
      description: description ? description : 'Den lokale skakklub på nørrebro',
      emails: 'kontakt@nbskak.dk',
      locale: 'da',
      title: title ? `${title} | Nørrebro Skakklub` : 'Nørrebro Skakklub',
      siteName: 'Nørrebro skakkklub',
      phoneNumbers: [''],
      images: [{
        url: 'https://nbskak.arctix.dev/images/skakudenfor.jpg',
        alt: 'Nogle folk sommer spiller skak udenfor',
      }, {
        url: 'https://nbskak.arctix.dev/images/chess-bg.webp',
        alt: 'Et skakbræt på en orange baggrund med skakbrikker ligger rundt omkring',
      }],
    },
    twitter: {
      card: 'summary',
      title: title ? `${title} | Nørrebro Skakklub` : 'Nørrebro Skakklub',
      description: description ? description : 'Den lokale skakklub på nørrebro',
      images: [{
        url: 'https://nbskak.arctix.dev/images/skakudenfor.jpg',
        alt: 'Nogle folk sommer spiller skak udenfor',
      }, {
        url: 'https://nbskak.arctix.dev/images/chess-bg.webp',
        alt: 'Et skakbræt på en orange baggrund med skakbrikker ligger rundt omkring',
      }],
    }
  }

  return metadata;
}