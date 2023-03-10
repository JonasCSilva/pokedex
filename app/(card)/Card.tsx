'use client'

import Image from 'next/image'
import { Pokemon } from '../types'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'

const typesColors = {
  bug: '#004a1f',
  dark: '#010202',
  dragon: '#008b97',
  // electric: '#e2e400',
  electric: '#b9bb00',
  fairy: '#b01344',
  fighting: '#b03d1e',
  fire: '#c8191e',
  flying: '#37677f',
  ghost: '#30306d',
  grass: '#007c36',
  ground: '#b97021',
  ice: '#4fd2f6',
  normal: '#81515c',
  poison: '#6b298d',
  psychic: '#bf246d',
  rock: '#521204',
  steel: '#55756e',
  water: '#0051e6'
}

export function Card({ pokemon: { name, sprites, types, id } }: { pokemon: Pokemon }) {
  return (
    <motion.div whileHover={{ scale: 1.075, transition: { duration: 0.5 } }} className={styles.root}>
      <div className={styles.imageContainer}>
        <Image src={sprites.front_default} alt={name + ' sprite'} fill sizes='20vw' className={styles.image} />
      </div>
      <h4 className={styles.id}>Nº {id}</h4>
      <h2>{name.at(0)!.toUpperCase() + name.slice(1)}</h2>
      <div className={styles.typesContainer}>
        {types.map(({ type: { name } }: { type: { name: keyof typeof typesColors } }) => (
          <span key={name} className={styles.type} style={{ backgroundColor: typesColors[name] }}>
            {name.toUpperCase()}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
