'use client'

import { memo } from 'react'

import { Aside } from '@/components/aside/Aside'
import { List } from '@/components/list/List'
import { Scrollbar } from '@/components/scroll-bar/ScrollBar'
import { DataContextProvider } from '@/contexts/DataContext'
import { ScrollContextProvider } from '@/contexts/ScrollContext'
import { SelectedPokemonContextProvider } from '@/contexts/SelectedPokemonContext'

const MemoizedAside = memo(Aside)
const MemoizedList = memo(List)
const MemoizedScrollbar = memo(Scrollbar)

export const Client = () => (
  <SelectedPokemonContextProvider>
    <ScrollContextProvider>
      <DataContextProvider>
        <MemoizedList />
      </DataContextProvider>
      <MemoizedScrollbar />
    </ScrollContextProvider>
    <MemoizedAside />
  </SelectedPokemonContextProvider>
)
