import { Client } from '@/app/(index)/client'

import styles from './page.module.scss'

export default function Page() {
  return (
    <main className={styles.root}>
      <h1 className={styles.heading}>Pokedex</h1>
      <Client />
    </main>
  )
}
