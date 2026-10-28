import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Aman Sajwan | Full Stack Software Engineer',
  description: 'Full Stack Software Engineer with 3+ years of experience designing and delivering scalable web applications, FastAPI & Django backends, Next.js, React, RAG AI, and cloud solutions.',
  keywords: ['Aman Sajwan', 'Full Stack Developer', 'React.js', 'Next.js', 'TypeScript', 'FastAPI', 'Python', 'Three.js', 'Portfolio'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  )
}

