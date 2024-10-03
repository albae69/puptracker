import { Button } from '@/components/ui/button'
import useIsLogin from '@/utils/useIsLogin'
import { createLazyFileRoute, Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const { isLogin } = useIsLogin()

  if (isLogin) {
    window.location.replace('/home')
    return
  }

  return (
    <section className='h-screen flex flex-col justify-center  text-center p-4'>
      <h1 className='text-2xl text-black font-bold mb-4'>Puptracker</h1>
      <p className='text-sm'>kamu udah pup belum hari ini?</p>
      <p className='text-sm'>
        catat untuk pastikan bahwa kamu sehat dengan pup setiap hari
      </p>
      <Link to='/login'>
        <Button className='mt-8 animate-spin'>Mashhoook</Button>
      </Link>
    </section>
  )
}
