import { Metadata } from "next";

export async function makeMetadata(title?: string, description?: string, author?: string) {
  const metadata: Metadata = {
    metadataBase: new URL('https://nbskak.dk'),
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
      url: '/favicon.ico'
    }, {
      rel: 'icon',
      url: '/logo.png'
    }, {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png'
    }, {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png'
    }, {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/apple-touch-icon.png'
    }, {
      rel: 'manifest',
      url: '/site.webmanifest'
    }, {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
      color: '#5bbad5'
    }],
    keywords: ["skak", "chess", "skakklub", "chessclub", "nørrebro", "copenhagen", "social", "education", "entertainment", "games"],
    manifest: '/site.webmanifest',
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
        url: '/card.webp',
        alt: 'Nørrebro skakklub',
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | Nørrebro Skakklub` : 'Nørrebro Skakklub',
      description: description ? description : 'Den lokale skakklub på nørrebro',
      images: [{
        url: '/card.webp',
        alt: 'Nørrebro skakklub',
      }]
    }
  }

  return metadata;
}