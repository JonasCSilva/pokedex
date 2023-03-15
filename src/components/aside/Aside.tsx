import { PokemonContextPokemon } from '@/contexts/PokemonContext'
import { firstLetterUpperCase } from '@/lib/functions'
import { Pokemon } from '@/lib/types'
import { typesColors } from '@/lib/typesColors'
import Image from 'next/image'
import { useContext } from 'react'
import styles from './styles.module.scss'

export function Aside() {
  const pokemon = useContext(PokemonContextPokemon)

  return (
    <aside className={styles.aside}>
      <main>
        {pokemon && (
          <>
            <h2 className={styles.name}>{firstLetterUpperCase(pokemon.name)}</h2>
            <h3 className={styles.id}>Nº {pokemon.id}</h3>
            <div className={styles.imageContainer}>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                alt={pokemon.name + ' sprite'}
                fill
                sizes='20vw'
                className={styles.image}
              />
            </div>
            <div className={styles.typesContainer}>
              {pokemon.types.map(({ type: { name } }) => (
                <span key={name} className={styles.type} style={{ backgroundColor: typesColors[name] }}>
                  {name.toUpperCase()}
                </span>
              ))}
            </div>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <h4>WEIGHT</h4>
                <h5>{pokemon.weight / 10} Kg</h5>
              </div>
              <div className={styles.stat}>
                <h4>BASE EXP</h4>
                <h5>{pokemon.base_experience}</h5>
              </div>
              <div className={styles.stat}>
                <h4>HEIGHT</h4>
                <h5>{pokemon.height / 10} m</h5>
              </div>
            </div>
            <div className={styles.abilitiesContainer}>
              {pokemon.abilities.map(({ ability: { name } }) => (
                <span key={name} className={styles.ability}>
                  {name.toUpperCase()}
                </span>
              ))}
            </div>
          </>
        )}
      </main>
    </aside>
  )
}
