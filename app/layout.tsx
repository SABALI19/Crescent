// app/layout.tsx
import type { Metadata } from "next";
import { ReactNode } from "react"
import "../styles/globals.css"
import Headerpage from "@/component/layout/header"
import Footer from "@/component/layout/Footer"
import { LanguageProvider } from "@/context/LanguageContext"

export const metadata: Metadata = {
  title: "Crescent",
  description: "Crescent Crypto Platform",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Headerpage />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}