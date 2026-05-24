import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aman Sajwan — Software Engineer',
  description: 'Full Stack Software Engineer with 3+ years of experience in React.js, Next.js, TypeScript, Node.js and Django.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
