import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Gutemberg & Thais",
  description: "Uma celebração do nosso amor",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}