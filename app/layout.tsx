import React, { ReactNode } from 'react'
import '../styles/globals.css'
import Headerpage from '@/component/layout/header'
import Footer from '@/component/layout/Footer'


export const metadata = {
  title: 'Crescent',
  description: 'Crescent Crypto Platform',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Headerpage />
        <main>{children}

        </main>
        <Footer />
      </body>
    </html>
  )
}
