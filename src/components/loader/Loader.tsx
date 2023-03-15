import { DataContextIsValidating, DataContextData } from '@/contexts/DataContext'
import ClipLoader from 'react-spinners/ClipLoader'
import { useContext } from 'react'
import styles from './styles.module.scss'
import { LIMIT, SIZE } from '@/lib/consts'

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
