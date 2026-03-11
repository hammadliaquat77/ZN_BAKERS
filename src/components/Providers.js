'use client'
import { SessionProvider } from 'next-auth/react'
import { CartProvider } from '@/components/CartContext'
import { ThemeProvider } from '@/components/ThemeContext'
  

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
