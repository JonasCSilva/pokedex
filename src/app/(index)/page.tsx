'use client'

import { Inter } from 'next/font/google'
import { List } from '../../components/list/List'
import styles from './page.module.scss'
import { memo, useState } from 'react'
import { Pokemon } from '../../lib/types'
import { Aside } from '@/components/aside/Aside'

const inter = Inter({ subsets: ['latin'] })

const MemoizedList = memo(List)

export default function Page() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  return (
    <main className={[inter.className, styles.root].join(' ')}>
      <h1 className={styles.heading}>Pokedex</h1>
      <MemoizedList setPokemon={setPokemon} />
      <Aside pokemon={pokemon} />
    </main>
  )
}
