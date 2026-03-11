import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ZN Bakers — Artisan Bakery Karachi',
  description: 'Premium cakes, breads, and desserts handcrafted fresh every day. Order online for delivery across Karachi.',
  keywords: 'bakery, cakes, bread, desserts, Karachi, custom cakes, ZN Bakers',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Jost:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
