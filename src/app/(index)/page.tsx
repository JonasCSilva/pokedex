import { Inter } from 'next/font/google'

import { Client } from '@/app/(index)/client'

import styles from './page.module.scss'

const inter = Inter({ subsets: ['latin'] })

export default function Page() {
  return (
    <main className={[inter.className, styles.root].join(' ')}>
      <h1 className={styles.heading}>Pokedex</h1>
      <Client />
    </main>
  )
}
