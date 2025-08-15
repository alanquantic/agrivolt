import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
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
  authors: [{ name: 'AgriVolt', url: 'https://agrivolt.mx' }],
  creator: 'AgriVolt',
  publisher: 'AgriVolt',
  metadataBase: new URL('https://agrivolt.mx'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: 'https://agrivolt.mx',
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
        <link rel="icon" type="image/png" href="/img/AgriVolt_logo_oficial.png" />
        <link rel="apple-touch-icon" href="/img/AgriVolt_logo_oficial.png" />
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
              "url": "https://agrivolt.mx",
              "logo": "https://agrivolt.mx/img/AgriVolt_logo_oficial.png",
              "description": "Drones agrícolas para pulverización, esparcido y izaje con tecnología de precisión",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "MX",
                "addressRegion": "Aguascalientes"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+52-000-000-0000",
                "contactType": "sales",
                "email": "ventas@agrivolt.mx",
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