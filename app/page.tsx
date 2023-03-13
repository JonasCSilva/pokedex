import { Inter } from 'next/font/google'
import { List } from './(list)/List'
import styles from './page.module.scss'

// https://www.npmjs.com/package/react-spinners

const inter = Inter({ subsets: ['latin'] })

export default async function Page() {
  return (
    <main className={[inter.className, styles.root].join(' ')}>
      <h1 className={styles.heading}>Pokedex</h1>
      <List />
      <aside className={styles.aside}></aside>
    </main>
  )
}
