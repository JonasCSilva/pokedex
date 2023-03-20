import { Inter } from 'next/font/google'

import './globals.scss'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pokedex',
  description: 'Pokedex page'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
