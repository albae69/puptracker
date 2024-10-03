import { Link } from '@tanstack/react-router'

type Props = {
  title: string
  count: number
}

export default function DashboardCard({ title, count }: Props) {
  return (
    <Link
      to='/history'
      search={{ filter: title.replace(' ', '_').toLowerCase() }}
    >
      <div className='border shadow-sm transition-all ease-in-out rounded-md p-4 hover:-translate-y-1 hover:cursor-pointer'>
        <h3 className='text-md font-medium'>{title}</h3>
        <h1 className='text-2xl font-bold'>{count}x</h1>
      </div>
    </Link>
  )
}
