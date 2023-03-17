import { motion, useInView } from 'framer-motion'
import { useContext, useRef, memo } from 'react'

import { SelectedPokemonContextSetPokemon } from '@/contexts/SelectedPokemonContext'
import { Pokemon } from '@/lib/types'

import { GridCardContent } from '../grid-card-content/GridCardContent'
import styles from './styles.module.scss'

const MemoizedGridCardContent = memo(GridCardContent)

export function GridCard({ pokemon, isSelected }: { pokemon: Pokemon; isSelected: boolean }) {
  const myRef = useRef(null)
  const isInView = useInView(myRef, { amount: 0 })
  const setSelectedPokemon = useContext(SelectedPokemonContextSetPokemon)!

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.975 }}
      className={[styles.root, isSelected ? styles.gradient : ''].join(' ')}
      ref={myRef}
      onClick={() => setSelectedPokemon(pokemon)}
    >
      <main className={styles.main}>{isInView && <MemoizedGridCardContent pokemon={pokemon} />}</main>
    </motion.div>
  )
}
