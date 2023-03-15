import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

export const ScrollContextProgess = createContext<number | null>(null)
export const ScrollContextSetProgess = createContext<Dispatch<SetStateAction<number>> | null>(null)

export function ScrollContextProvider({ children }: { children: ReactNode }) {
  const [progess, setProgess] = useState(0)

  return (
    <ScrollContextProgess.Provider value={progess}>
      <ScrollContextSetProgess.Provider value={setProgess}>{children}</ScrollContextSetProgess.Provider>
    </ScrollContextProgess.Provider>
  )
}
