import Image from 'next/image'
import { Pokemon } from '../../lib/types'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import { typesColors } from '../../lib/typesColors'
import { useInViewport } from 'react-in-viewport'
import { useContext, useRef } from 'react'
import { firstLetterUpperCase } from '@/lib/functions'
import { PokemonContextSetPokemon } from '@/contexts/PokemonContext'

export function Card({ pokemon }: { pokemon: Pokemon }) {
  const { name, types, id } = pokemon

  const myRef = useRef(null)
  const { inViewport } = useInViewport(myRef, { threshold: 0.3 })
  const setPokemon = useContext(PokemonContextSetPokemon)!

  return (
    <motion.div
      whileHover={{ scale: 1.075, transition: { duration: 0.3 } }}
      className={styles.root}
      ref={myRef}
      onClick={() => setPokemon(pokemon)}
    >
      {inViewport && (
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
