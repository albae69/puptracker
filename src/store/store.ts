import { PupHistory, User } from 'types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type State = {
  user: User | null
  history: PupHistory[]
}

export type Action = {
  setUser: (u: State['user']) => void
  setHistory: (history: State['history']) => void
}

export const useStore = create<State & Action>()(
  persist(
    (set) => ({
      history: [],
      setHistory: (data: PupHistory[]) => set({ history: data }),
      user: null,
      setUser: (u: User | null) => set({ user: u }),
    }),
    {
      name: 'store',
    }
  )
)
