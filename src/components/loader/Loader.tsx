import { useContext } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

import { DataContextData, DataContextIsValidating } from '@/contexts/DataContext'
import { LIMIT, SIZE } from '@/lib/consts'

import styles from './styles.module.scss'

export function Loader() {
  const data = useContext(DataContextData)
  const isValidating = useContext(DataContextIsValidating)

  return (
    <>
      {data.length + SIZE < LIMIT && (
        <div className={styles.loaderContainer}>{isValidating && <ClipLoader loading color='red' size={100} />}</div>
      )}
    </>
  )
}
