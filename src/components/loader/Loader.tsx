import { DataContextLoader } from '@/contexts/DataContext'
import ClipLoader from 'react-spinners/ClipLoader'
import { useContext } from 'react'
import styles from './styles.module.scss'

export function Loader() {
  const { isValidating, isThereMore } = useContext(DataContextLoader)

  return (
    <>
      {isThereMore && (
        <div className={styles.loaderContainer}>{isValidating && <ClipLoader loading color='red' size={100} />}</div>
      )}
    </>
  )
}
