import { useContext } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

import { DataContextIsLoading } from '@/contexts/DataContext'

import { Grid } from '../grid/Grid'
import styles from './styles.module.scss'

export function List() {
  const isLoading = useContext(DataContextIsLoading)

  return (
    <>
      {isLoading ? (
        <div className={styles.mainLoaderContainer}>
          <ClipLoader loading color='red' size={200} />
        </div>
      ) : (
        <Grid />
      )}
    </>
  )
}
