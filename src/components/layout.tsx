import { ReactNode } from '@tanstack/react-router'

export default function Layout({ children }: ReactNode) {
  return (
    <main className='max-w-[400px] mx-auto border min-h-screen'>
      {children}
    </main>
  )
}
