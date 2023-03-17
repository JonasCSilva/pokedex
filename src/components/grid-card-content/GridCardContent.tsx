import Image from 'next/image'

import { typesColors } from '@/lib/consts'
import { firstLetterUpperCase } from '@/lib/functions'
import { Pokemon } from '@/lib/types'

import styles from './styles.module.scss'

export function GridCardContent({ pokemon }: { pokemon: Pokemon }) {
  const { name, types, id } = pokemon

  return (
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
  )
}
