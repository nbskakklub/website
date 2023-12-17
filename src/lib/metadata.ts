import { Metadata } from "next";

export async function makeMetadata(title?: string, description?: string, author?: string) {
  const metadata: Metadata = {
    metadataBase: new URL('https://nbskak.arctix.dev'),
    title: title ? `${title} | Nørrebro Skakklub` : 'Nørrebro Skakklub',
    description: description ? description : 'Velkommen til Nørrebro Skakklub. Med godt og vel 60 medlemmer er vores klub en af de største skakklubber i København, tillige har vi en stor juniorafdeling. Kom ned i vores hyggelige lokaler på hjørnet af Frejasgade og Thorsgade og oplev stemningen.',
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
      url: 'https://website-bw4.pages.dev/icon.png'
    },],
    keywords: ["skak", "chess", "skakklub", "chessclub", "nørrebro", "copenhagen", "social", "education", "entertainment", "games"],
    manifest: 'https://website-bw4.pages.dev/site.webmanifest',
    openGraph: {
      type: 'website',
      countryName: 'Denmark',
      description: description ? description : 'Velkommen til Nørrebro Skakklub. Med godt og vel 60 medlemmer er vores klub en af de største skakklubber i København, tillige har vi en stor juniorafdeling. Kom ned i vores hyggelige lokaler på hjørnet af Frejasgade og Thorsgade og oplev stemningen.',
      emails: 'kontakt@nbskak.dk',
      locale: 'da_DK',
      title: title ? `${title} | Nørrebro Skakklub` : 'Nørrebro Skakklub',
      siteName: 'Nørrebro Skakkklub',
      phoneNumbers: [''],
      images: [{
        url: 'https://website-bw4.pages.dev/images/skakudenfor.webp',
        alt: 'Nogle folk sommer spiller skak udenfor',
      }, {
        url: 'https://website-bw4.pages.dev/images/chess-bg.webp',
        alt: 'Et skakbræt på en orange baggrund med skakbrikker ligger rundt omkring',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | Nørrebro Skakklub` : 'Nørrebro Skakklub',
      description: description ? description : 'Den lokale skakklub på nørrebro',
      images: [{
        url: 'https://website-bw4.pages.dev/images/skakudenfor.webp',
        alt: 'Nogle folk sommer spiller skak udenfor',
      }, {
        url: 'https://website-bw4.pages.dev/images/chess-bg.webp',
        alt: 'Et skakbræt på en orange baggrund med skakbrikker ligger rundt omkring',
      }],
    }
  }

  return metadata;
}