import type { Metadata } from "next"
import ClientPage from "./ClientPage"

export const metadata: Metadata = {
  title: "Haxurn | Cybersecurity, Coding & Music",
  description: "Portfolio of a passionate cybersecurity enthusiast, coder, and music producer.",
}

export default function Home() {
  return (
    <div style={{ scrollBehavior: 'auto' }}>
      <ClientPage />
    </div>
  )
}