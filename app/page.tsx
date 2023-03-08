import { Inter } from 'next/font/google'
import styles from './page.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default async function Page() {
  return (
    <main className={[inter.className, styles.main].join(' ')}>
      <h1>Pokedex</h1>
    </main>
  )
}
