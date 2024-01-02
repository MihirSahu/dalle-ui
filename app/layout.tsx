import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar'
import { ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications';

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
            <MantineProvider>
              <Notifications />
              <Navbar />
              {children}
            </MantineProvider>
          </body>
      </html>
  )
}
