import type { Metadata } from 'next'

import { Inter } from 'next/font/google'
import '../stylesheets/application.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Aloha Notes',
  description: 'Creating notes with styles 🏄‍♂️',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="layout-default" lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
