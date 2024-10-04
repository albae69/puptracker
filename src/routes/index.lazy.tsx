import { Button } from '@/components/ui/button'
import useGetLocation from '@/utils/location'
import useIsLogin from '@/utils/useIsLogin'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { isLogin } = useIsLogin()
  const location = useGetLocation()
  console.log('has access location?', location)

  if (isLogin) {
    window.location.replace('/home')
    return
  }

  return (
    <section className='h-screen flex flex-col justify-center  text-center p-4'>
      <h1 className='text-2xl text-black font-bold mb-4'>Berakin 💩</h1>
      <p className='text-sm'>kamu udah 💩 belum hari ini?</p>
      <p className='text-sm mb-4'>
        catat untuk pastikan bahwa kamu sehat dengan 💩 setiap hari
      </p>
      <Link to='/explore' className='w-full'>
        <Button className='bg-white text-black border shadow-md my-2 w-full hover:bg-gray-100'>
          Explore
        </Button>
      </Link>
      <Link to='/login' className='w-full'>
        <Button className='w-full'>Masuk</Button>
      </Link>
    </section>
  )
}
