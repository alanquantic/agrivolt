import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'AgriVolt — Drones agrícolas: precisión, potencia y ahorro de insumos',
    template: '%s | AgriVolt'
  },
  description: 'Drones agrícolas para pulverización, esparcido y izaje. Cobertura uniforme, ahorro de pesticidas y operación segura. Distribución para Latinoamérica desde México.',
  keywords: [
    'drones agrícolas',
    'pulverización',
    'agricultura de precisión',
    'RTK',
    'mapeo',
    'esparcido granular',
    'atomización',
    'AgriVolt',
    'tecnología agrícola',
    'LATAM'
  ],
  authors: [{ name: 'AgriVolt', url: 'https://www.agrivoltdrone.com' }],
  creator: 'AgriVolt',
  publisher: 'AgriVolt',
  metadataBase: new URL('https://www.agrivoltdrone.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://www.agrivoltdrone.com',
    siteName: 'AgriVolt',
    title: 'AgriVolt — Drones agrícolas: precisión, potencia y ahorro de insumos',
    description: 'Drones agrícolas para pulverización, esparcido y izaje. Cobertura uniforme, ahorro de pesticidas y operación segura. Distribución para Latinoamérica desde México.',
    images: [
      {
        url: '/img/AgriVolt_logo_oficial.png',
        width: 1200,
        height: 630,
        alt: 'AgriVolt - Logo Oficial',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AgriVolt — Drones agrícolas: precisión, potencia y ahorro de insumos',
    description: 'Drones agrícolas para pulverización, esparcido y izaje. Cobertura uniforme, ahorro de pesticidas y operación segura.',
    images: ['/img/AgriVolt_logo_oficial.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'verification-code-here',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" type="image/svg+xml" href="/AgriVoltLOGO.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/img/AgriVolt_logo_oficial.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/img/AgriVolt_logo_oficial.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/img/AgriVolt_logo_oficial.png" />
        <link rel="shortcut icon" href="/img/AgriVolt_logo_oficial.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon-square.svg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon-square.svg" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon-square.svg" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon-square.svg" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon-square.svg" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon-square.svg" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon-square.svg" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon-square.svg" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon-square.svg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="AgriVolt" />
        {/* Web App Manifest */}
        <link rel="manifest" href="/manifest.json" />
        {/* Theme color */}
        <meta name="theme-color" content="#2d39f1" />
        {/* Organization JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "AgriVolt",
              "url": "https://www.agrivoltdrone.com",
              "logo": "https://www.agrivoltdrone.com/img/AgriVolt_logo_oficial.png",
              "description": "Drones agrícolas para pulverización, esparcido y izaje con tecnología de precisión",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "MX",
                "addressRegion": "Aguascalientes"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                                       "telephone": "+52-449-448-0012",
                "contactType": "sales",
                                  "email": "ventas@agrivoltdrone.com",
                "availableLanguage": ["Spanish"]
              },
              "sameAs": [
                "https://linkedin.com/company/agrivolt",
                "https://youtube.com/@agrivolt"
              ]
            })
          }}
        />
      </head>
      <body className="bg-white text-slate-900 antialiased font-body">
        {children}
      </body>
    </html>
  )
}