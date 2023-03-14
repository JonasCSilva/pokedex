import './globals.scss'

export const metadata = {
  title: 'Pokedex',
  description: 'Pokedex page'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
