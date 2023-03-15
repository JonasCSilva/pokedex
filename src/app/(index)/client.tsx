'use client'

import { memo } from 'react'

import { Aside } from '@/components/aside/Aside'
import { List } from '@/components/list/List'
import { Scrollbar } from '@/components/scroll-bar/ScrollBar'
import { DataContextProvider } from '@/contexts/DataContext'
import { PokemonContextProvider } from '@/contexts/PokemonContext'
import { ScrollContextProvider } from '@/contexts/ScrollContext'

const MemoizedAside = memo(Aside)
const MemoizedList = memo(List)
const MemoizedScrollbar = memo(Scrollbar)

export const Client = () => (
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
