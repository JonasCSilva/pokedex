import { Pokemon } from '@/lib/types'
import { Dispatch, memo, SetStateAction, useState } from 'react'
import { List } from '../list/List'
import { Scrollbar } from '../scroll-bar/ScrollBar'

// const MemoizedList = memo(List)
const MemoizedScrollbar = memo(Scrollbar)

export function ScrollList({ setPokemon }: { setPokemon: Dispatch<SetStateAction<Pokemon | null>> }) {
  const [progess, setProgess] = useState(0)

  return (
    <>
      <List setPokemon={setPokemon} setProgess={setProgess} />
      <MemoizedScrollbar progess={progess} />
    </>
  )
}
