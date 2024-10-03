import DashboardCard from '@/components/dashboard_card'
import supabase from '@/utils/supabase'
import useIsLogin from '@/utils/useIsLogin'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useToast } from '@/hooks/use-toast'
import filterByDate from '@/utils/filterByDate'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { divIcon } from 'leaflet'

import useGetLocation from '@/utils/location'
import Header from '@/components/header'
import { useStore } from '@/store/store'
import dayjs from 'dayjs'

export const Route = createLazyFileRoute('/home')({
  component: Home,
})

const pooIcon = divIcon({ html: '💩', className: 'text-2xl' })

export default function Home() {
  useGetLocation()

  const { toast } = useToast()
  const { isLogin, token } = useIsLogin()

  const store = useStore((state) => state)
  const { user, setUser, history, setHistory } = store

  const [showMap, setShowMap] = useState(true)

  const descRef = useRef<HTMLTextAreaElement>(null)

  const location = localStorage.getItem('location')
  const parseLocation = location != null ? JSON.parse(location!) : {}
  const { latitude, longitude } = parseLocation

  async function poop() {
    if (descRef.current?.value?.length! < 3) {
      alert('minimal 3 karakter bos')
      return
    }

    const res = await supabase.from('pup_history').insert([
      {
        user_id: user?.id,
        latitude: latitude,
        longitude: longitude,
        description: descRef.current?.value,
      },
    ])

    if (res.status == 201) {
      toast({
        title: 'Yeay',
        description: 'Congrats telah berak hari ini!!',
      })
      await getPupHistory(user?.id!)
      setShowMap(true)
    }
  }

  async function getPupHistory(uid: string) {
    const resHistory = await supabase
      .from('pup_history')
      .select()
      .eq('user_id', uid)
      .order('created_at', { ascending: false })

    if (resHistory.status == 200) {
      const data = resHistory.data
      if (data?.length) {
        setHistory(data)
      }
    }
  }

  useEffect(() => {
    if (!isLogin) {
      window.location.replace('/')
      return
    }

    ;(async () => {
      const resAuth = await supabase.auth.getUser(token!)
      const uid = resAuth.data.user?.id

      const resUser = await supabase.from('users').select().eq('id', uid)
      await getPupHistory(uid!)

      if (resUser.data != null) {
        const u = resUser.data[0]
        setUser(u)
      } else {
        localStorage.clear()
        toast({
          title: 'Error',
          description: 'Something wrong!',
        })
        window.location.replace('/')
      }
    })()
  }, [])

  return (
    <>
      <Header />

      <section className='p-4'>
        <h3 className='mb-2 text-sm'>
          Halo <strong>{user?.name}</strong>, udah pup kah hari ini?
        </h3>

        {/* Card */}
        <section className='grid grid-cols-2 gap-4'>
          <DashboardCard
            title='Hari ini'
            count={filterByDate(history, 'day').length}
          />
          <DashboardCard
            title='Mingguan'
            count={filterByDate(history, 'week').length}
          />
          <DashboardCard
            title='Bulanan'
            count={filterByDate(history, 'month').length}
          />
          <DashboardCard
            title='Tahunan'
            count={filterByDate(history, 'year').length}
          />
        </section>
        {/* Card */}

        {/* Button */}
        <Dialog
          onOpenChange={(open) => {
            setShowMap(!open)
          }}>
          <DialogTrigger
            className='w-full py-8 text-2xl animate-bounce'
            onClick={() => setShowMap(false)}>
            💩
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sudah selesai pup?</DialogTitle>
              <DialogDescription>
                Ceritakan pengalaman mu melaksanakan{' '}
                <strong className='text-black font-medium'>Ritual</strong> hari
                ini.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Textarea
                ref={descRef}
                placeholder='gelaa,udah nahan dari sejam lalu akhirnya nemu toilet..'
              />
              <DialogClose asChild onClick={poop}>
                <Button className='w-full mt-4 bg-white hover:bg-white text-xl'>
                  💩
                </Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
        {/* Button */}

        <h3 className='text-md text-black mb-2'>
          {location != null ? (
            <>
              {' '}
              Udah <strong>pup</strong> dimana aja bre?
            </>
          ) : (
            'aktifkan lokasi dulu bre \nbiar bisa liat dimana aja udah pup'
          )}
        </h3>

        {/* Map */}
        {showMap
          ? location != null && (
              <MapContainer
                center={[Number(latitude), Number(longitude)]}
                zoom={14}
                scrollWheelZoom={false}
                id='map'>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />

                {history.length > 0 &&
                  history.map((item) => (
                    <Marker
                      key={item.id}
                      icon={pooIcon}
                      position={[
                        Number(item.latitude),
                        Number(item.longitude),
                      ]}>
                      <Popup>
                        <p className='text-xs text-black font-medium'>
                          {dayjs(item.created_at).format('DD MMM YYYY HH:mm')}
                        </p>
                        <p className='text-sm'>{item.description}</p>
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
            )
          : null}
        {/* Map */}
      </section>
    </>
  )
}
