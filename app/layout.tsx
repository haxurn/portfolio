import "@/app/globals.css"
import BottomNav from "@/components/bottom-nav"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Inter } from "next/font/google"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning style={{ scrollBehavior: 'auto' }}>
      <head>
      </head>
      <body className={`${inter.className} bg-[#0a1120]`} style={{ scrollBehavior: 'auto' }}>
        <ThemeProvider attribute="class" defaultTheme="dark">

          {children}
          <Footer />
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
