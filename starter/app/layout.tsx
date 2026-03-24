import type { Metadata } from 'next'
import { PostHogProvider } from '@/components/PostHogProvider'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Matthew Batterson — GTM Engineer',
    template: '%s | Matthew Batterson',
  },
  description: 'I build GTM systems. The kind that run while you sleep.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Matthew Batterson',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          <Navigation />
          <main style={{ minHeight: '100vh', paddingTop: 60 }}>
            {children}
          </main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  )
}
