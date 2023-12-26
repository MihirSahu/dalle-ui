import '@mantine/core/styles.css';

import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'

const lexend = Lexend({ subsets: ['latin'], weight: ["600"] })

export const metadata: Metadata = {
  title: 'DALLE UI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <head>
          <ColorSchemeScript />
        </head>
        <body className={lexend.className}>
          <Navbar />
          <MantineProvider>{children}</MantineProvider>
        </body>
      </html>
  )
}
