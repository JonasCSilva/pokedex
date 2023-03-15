'use client'

import { ScrollContextProvider } from '@/contexts/ScrollContext'
import { PokemonContextProvider } from '@/contexts/PokemonContext'
import { memo } from 'react'
import { Aside } from '@/components/aside/Aside'
import { List } from '@/components/list/List'
import { Scrollbar } from '@/components/scroll-bar/ScrollBar'
import { DataContextProvider } from '@/contexts/DataContext'

const MemoizedAside = memo(Aside)
const MemoizedList = memo(List)
const MemoizedScrollbar = memo(Scrollbar)

export function Client() {
  return (
    <PokemonContextProvider>
      <ScrollContextProvider>
        <DataContextProvider>
          <MemoizedList />
        </DataContextProvider>
        <MemoizedScrollbar />
      </ScrollContextProvider>
      <MemoizedAside />
    </PokemonContextProvider>
  )
}