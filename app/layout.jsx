import { Bebas_Neue, Instrument_Serif, Archivo, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Threshold from '@/components/Threshold';
import Atmosphere from '@/components/Atmosphere';
import SiteMotion from '@/components/SiteMotion';

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bebas',
});

const instrument = Instrument_Serif({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument',
});

const archivo = Archivo({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
});

const jetbrains = JetBrains_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

export const metadata = {
  metadataBase: new URL('https://truthtoculture.com'),
  title: {
    default: 'Truth to Culture — Rita Wright',
    template: '%s · Truth to Culture',
  },
  description:
    'A world for changing your mindset. Courses that become daily practice, and a reading room that keeps you fed between reps.',
  openGraph: {
    title: 'Truth to Culture — Rita Wright',
    description:
      'A world for changing your mindset. Courses that become daily practice, and a reading room that keeps you fed between reps.',
    siteName: 'Truth to Culture',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#08090A',
};

// Runs before paint so a returning visitor never sees the threshold flash.
// Appends a style rule rather than stamping an attribute on <html>, which
// React would flag as a hydration mismatch.
const THRESHOLD_BOOT = `try{if(sessionStorage.getItem('ttc.threshold.seen')==='1'){var s=document.createElement('style');s.textContent='#threshold{display:none!important}';document.head.appendChild(s)}}catch(e){}`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${instrument.variable} ${archivo.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THRESHOLD_BOOT }} />
      </head>
      <body>
        <Threshold />
        <Atmosphere />
        <SiteMotion />
        <Nav />
        <div style={{ position: 'relative', overflow: 'hidden' }}>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
