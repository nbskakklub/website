'use client'

import Navigation from "./Navigation";
import Footer from "./Footer";

import { Metadata } from 'next'
 
export const metadata: Metadata = {
  themeColor: '#fff',
  applicationName: 'Nørrebro skakklub',
  description: 'Hjemmeside af Nørrebro skakklub',
  manifest: '/site.webmanifest',
  viewport: 'width=device-width, initial-scale=1',
  icons: ['/icon.png'],

}

type Props = {
  children: React.ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="root">
      <nav>
        <Navigation />
      </nav>
      <main>{children}</main>
      <Footer></Footer>
      <style jsx>
        {`
          .root {
            min-height: 100vh;
            flex-direction:column;
            margin:0;
            display:flex;
          }
          main {
            flex:1;
            display: flex;
            min-height: 100%;
          }
          nav {
            padding-bottom: 2rem;
          }
          @media (min-width: 769px) {
            .root {
              
            }
            main {
              flex: 1 0 auto;
            }
          }
        `}
      </style>
    </div>
  );
}
