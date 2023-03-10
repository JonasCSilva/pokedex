import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import { List } from './(list)/List'
import styles from './page.module.scss'

// https://www.npmjs.com/package/react-spinners

const inter = Inter({ subsets: ['latin'] })

export default function Page() {
  return (
    <main className={[inter.className, styles.root].join(' ')}>
      <h1 className={styles.heading}>Pokedex</h1>
      <Suspense fallback={<p>Loading...</p>}>
        {/* @ts-expect-error Async Server Component */}
        <List />
      </Suspense>
    </main>
  )
}
