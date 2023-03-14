'use client'

import { Inter } from 'next/font/google'
import styles from './page.module.scss'
import { memo, useMemo, useState } from 'react'
import { Pokemon } from '../../lib/types'
import { Aside } from '@/components/aside/Aside'
import { ScrollList } from '@/components/scroll-list/ScrollList'

const inter = Inter({ subsets: ['latin'] })

const MemoizedAside = memo(Aside)
const MemoizedScrollList = memo(ScrollList)

export default function Page() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null)

  const memoizedPokemon = useMemo(() => pokemon, [pokemon])

  return (
    <main className={[inter.className, styles.root].join(' ')}>
      <h1 className={styles.heading}>Pokedex</h1>
      <MemoizedScrollList setPokemon={setPokemon} />
      <MemoizedAside pokemon={memoizedPokemon} />
    </main>
  )
}
