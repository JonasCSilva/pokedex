import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useContext, useRef } from 'react'

import { PokemonContextSetPokemon } from '@/contexts/PokemonContext'
import { firstLetterUpperCase } from '@/lib/functions'
import { Pokemon } from '@/lib/types'
import { typesColors } from '@/lib/typesColors'

import styles from './styles.module.scss'

export function Card({ pokemon }: { pokemon: Pokemon }) {
  const myRef = useRef(null)
  const isInView = useInView(myRef, { amount: 0.3 })
  const setPokemon = useContext(PokemonContextSetPokemon)!

  const { name, types, id } = pokemon

  return (
    <motion.div
      whileHover={{ scale: 1.075, transition: { duration: 0.3 } }}
      className={styles.root}
      ref={myRef}
      onClick={() => setPokemon(pokemon)}
    >
      {isInView && (
        <>
          <div className={styles.imageContainer}>
            <Image
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
              alt={name + ' sprite'}
              fill
              sizes='10vw'
              className={styles.image}
            />
          </div>
          <h4 className={styles.id}>Nº {id}</h4>
          <h2>{firstLetterUpperCase(name)}</h2>
          <div className={styles.typesContainer}>
            {types.map(({ type: { name } }) => (
              <span key={name} className={styles.type} style={{ backgroundColor: typesColors[name] }}>
                {name.toUpperCase()}
              </span>
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}
