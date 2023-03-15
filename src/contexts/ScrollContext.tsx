import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

export const ScrollContextProgress = createContext<number | null>(null)
export const ScrollContextSetProgess = createContext<Dispatch<SetStateAction<number>> | null>(null)

export function ScrollContextProvider({ children }: { children: ReactNode }) {
  const [progess, setProgress] = useState(0)

  return (
    <ScrollContextProgress.Provider value={progess}>
      <ScrollContextSetProgess.Provider value={setProgress}>{children}</ScrollContextSetProgess.Provider>
    </ScrollContextProgress.Provider>
  )
}
