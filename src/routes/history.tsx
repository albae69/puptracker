import Header from '@/components/header'
import { useStore } from '@/store/store'
import filterByDate, { Type } from '@/utils/filterByDate'
import { createFileRoute } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { PupHistory } from 'types'

export const Route = createFileRoute('/history')({
  component: History,
})

function History() {
  const { filter }: { filter: string } = Route.useSearch()
  const history = useStore((state) => state.history)

  let type: Type

  switch (filter) {
    case 'hari_ini':
      type = 'day'
      break
    case 'mingguan':
      type = 'week'
      break
    case 'bulanan':
      type = 'month'
      break
    case 'tahunan':
      type = 'year'
      break
    default:
      type = 'day'
      break
  }

  console.log(history)
  return (
    <>
      <Header />
      <section className='p-4'>
        <p className='mb-2'>nih daftar pup kamu</p>
        {filter == undefined
          ? history.map((item) => <Card {...item} key={item.id} />)
          : filterByDate(history, type).map((item) => (
              <Card {...item} key={item.id} />
            ))}
      </section>
    </>
  )
}

const Card = (item: PupHistory) => {
  return (
    <div
      key={item.id}
      className='p-4 border rounded-md shadow-sm mb-4 hover:-translate-y-1 transition-all cursor-pointer'
    >
      <p className='text-sm text-black font-medium'>
        {dayjs(item.created_at).format('DD MMM YYYY HH:mm')}
      </p>
      <p className='text-sm'>{item.description}</p>
    </div>
  )
}
