import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react'

export const ScrollContextProgress = createContext<number | null>(null)
export const ScrollContextSetProgess = createContext<Dispatch<SetStateAction<number>> | null>(null)

export function ScrollContextProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0)

  return (
    <ScrollContextProgress.Provider value={progress}>
      <ScrollContextSetProgess.Provider value={setProgress}>{children}</ScrollContextSetProgess.Provider>
    </ScrollContextProgress.Provider>
  )
}
