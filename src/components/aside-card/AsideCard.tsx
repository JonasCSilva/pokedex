import { motion } from 'framer-motion'
import Image from 'next/image'
import { Dispatch, SetStateAction, useContext } from 'react'
import { GrRotateRight } from 'react-icons/gr'

import { SelectedPokemonContextPokemon } from '@/contexts/SelectedPokemonContext'
import { firstLetterUpperCase } from '@/lib/functions'
import { Side } from '@/lib/types'

import styles from './styles.module.scss'

export function AsideCard({
  side,
  setSide,
  children
}: {
  side: Side
  children: JSX.Element
  setSide: Dispatch<SetStateAction<Side>>
}) {
  const pokemon = useContext(SelectedPokemonContextPokemon)!

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (side === Side.back) {
            setSide(Side.flippingFromBack)
          } else if (side === Side.front) {
            setSide(Side.flippingFromFront)
          }
        }}
        className={styles.flipButton}
      >
        <GrRotateRight size='1.9rem' />
      </motion.button>
      <header className={styles.header}>
        <h2 className={styles.name}>{firstLetterUpperCase(pokemon.name)}</h2>
        <h3 className={styles.id}>Nº {pokemon.id}</h3>
      </header>
      <div className={styles.imageContainer}>
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
            side === Side.front ? '' : 'back/'
          }${pokemon.id}.png`}
          alt={pokemon.name + ' sprite'}
          fill
          sizes='20vw'
          className={styles.image}
          quality={100}
          priority
        />
      </div>
      <footer className={styles.footer}>{children}</footer>
    </>
  )
}
