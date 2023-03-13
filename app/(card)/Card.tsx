import Image from 'next/image'
import { Pokemon, TypesNames } from '../types'
import styles from './styles.module.scss'
import { motion } from 'framer-motion'
import { typesColors } from '../lib'

export function Card({ pokemon: { name, sprites, types, id } }: { pokemon: Pokemon }) {
  return (
    <motion.div whileHover={{ scale: 1.075, transition: { duration: 0.5 } }} className={styles.root}>
      <div className={styles.imageContainer}>
        <Image src={sprites.front_default} alt={name + ' sprite'} fill sizes='20vw' className={styles.image} />
      </div>
      <h4 className={styles.id}>Nº {id}</h4>
      <h2>{name.at(0)!.toUpperCase() + name.slice(1)}</h2>
      <div className={styles.typesContainer}>
        {types.map(({ type: { name } }: { type: { name: TypesNames } }) => (
          <span key={name} className={styles.type} style={{ backgroundColor: typesColors[name] }}>
            {name.toUpperCase()}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
