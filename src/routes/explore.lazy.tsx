import supabase from '@/utils/supabase'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

import Header from '@/components/header'
import dayjs from 'dayjs'
import { PupHistory } from 'types'
import { divIcon } from 'leaflet'
import useGetLocation from '@/utils/location'

export const Route = createLazyFileRoute('/explore')({
  component: Explore,
})

const pooIcon = divIcon({ html: '💩', className: 'text-2xl' })

function Explore() {
  const location = useGetLocation()
  const parseLocation = location
    ? JSON.parse(localStorage.getItem('location')!)
    : null

  const [data, setData] = useState<PupHistory[] | []>([])

  useEffect(() => {
    ;(async () => {
      const { data: pup_history, error } = await supabase
        .from('pup_history')
        .select('*,users(*)')

      console.log(pup_history)
      console.log(error)

      setData(pup_history!)
    })()
  }, [])

  return (
    <>
      <Header />
      <section className='p-4'>
        <h3 className='text-2xl font-bold text-black mb-2'>Explore</h3>

        <p className='text-sm mb-4'>
          {parseLocation != null
            ? 'lihat semua tempat dimana saja yang lain pada 💩'
            : 'kalau kamu membaca ini, berarti aplikasi gagal mendapatkan lokasi mu, emang 💩'}
        </p>

        {parseLocation != null && (
          <MapContainer
            zoom={14}
            scrollWheelZoom={false}
            id='map-explore'
            center={[
              Number(parseLocation?.latitude),
              Number(parseLocation?.longitude),
            ]}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />

            {data.map((item) => (
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
                  <p className='text-sm'>- {item.users?.name}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </section>
    </>
  )
}
