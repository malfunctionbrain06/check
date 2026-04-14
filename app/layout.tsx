import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Gulabi Guiltz - Handcrafted Beaded Jewelry & Crochet',
  description: 'Discover whimsical handcrafted beaded jewelry and crochet accessories made with love and creativity. Shop unique pieces like the Mint Butterfly Clip.',
  keywords: 'beaded jewelry, crochet accessories, handmade, whimsical, handcrafted accessories, butterfly clip',
  generator: 'v0.app',
  metadataBase: new URL('https://gulabi-guiltz.vercel.app'),
  openGraph: {
    title: 'Gulabi Guiltz - Handcrafted Beaded Jewelry & Crochet',
    description: 'Discover whimsical handcrafted beaded jewelry and crochet accessories',
    type: 'website',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
