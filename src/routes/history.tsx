import { createFileRoute } from '@tanstack/react-router'
import { PupHistory } from 'types'
import filterByDate, { Type } from '@/utils/filterByDate'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import Header from '@/components/header'
import { useStore } from '@/store/store'
import dayjs from 'dayjs'
import { divIcon } from 'leaflet'

export const Route = createFileRoute('/history')({
  component: History,
})

const pooIcon = divIcon({ html: '💩', className: 'text-2xl' })

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
      <p className='text-sm mb-2'>{item.description}</p>

      <MapContainer
        center={[Number(item?.latitude), Number(item?.longitude)]}
        zoom={14}
        scrollWheelZoom={false}
        id='map-list'
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        <Marker
          key={item.id}
          icon={pooIcon}
          position={[Number(item.latitude), Number(item.longitude)]}
        >
          <Popup>
            <p className='text-xs text-black font-medium'>
              {dayjs(item.created_at).format('DD MMM YYYY HH:mm')}
            </p>
            <p className='text-sm'>{item.description}</p>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}
