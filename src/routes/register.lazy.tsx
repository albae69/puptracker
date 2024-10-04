import ErrorMessage from '@/components/error_message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import supabase from '@/utils/supabase'
import useIsLogin from '@/utils/useIsLogin'
import { AuthError } from '@supabase/supabase-js'
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { useRef, useState } from 'react'

export const Route = createLazyFileRoute('/register')({
  component: Register,
})

export default function Register() {
  const { toast } = useToast()
  const navigate = useNavigate({ from: '/register' })
  const { isLogin } = useIsLogin()

  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [status, setStatus] = useState<'loading' | ''>('')
  const [isError, setIsError] = useState<AuthError | null>(null)

  if (isLogin) {
    window.location.replace('/home')
    return
  }

  async function register() {
    setIsError(null)
    setStatus('loading')
    const { data, error } = await supabase.auth.signUp({
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    })
    if (error) {
      setIsError(error)
      setStatus('')
      return
    }
    if (data) {
      const res = await supabase.from('users').insert([
        {
          id: data.user?.id,
          email: data.user?.email,
          name: nameRef.current?.value,
        },
      ])

      console.log('res insert users', res)

      toast({ title: 'Yeay', description: 'kamu berhasil daftar, gas masuk!!' })
      navigate({ to: '/login', from: '/register' })
    }
  }

  return (
    <section className='p-4 flex flex-col h-screen justify-center'>
      <h1 className='text-2xl font-bold mb-4'>Daftar</h1>
      <Label htmlFor='nama'>Nama</Label>
      <Input
        ref={nameRef}
        name='nama'
        className='mb-4 mt-2'
        type='text'
        placeholder='Nama'
      />
      <Label htmlFor='email'>Email</Label>
      <Input
        ref={emailRef}
        name='email'
        className='mb-4 mt-2'
        type='email'
        placeholder='Email'
      />
      <Label htmlFor='password'>Password</Label>
      <Input
        ref={passwordRef}
        name='password'
        className='mb-4 mt-2'
        type='password'
        placeholder='Password'
      />
      <Button onClick={register} className='my-4'>
        {status == 'loading' ? '💩' : 'Daftar'}
      </Button>

      {isError && <ErrorMessage message={isError.message} />}

      <p className='text-sm text-center'>
        udah punya akun?{' '}
        <Link to='/login' className='underline'>
          anjayy, langsung aja ges
        </Link>
      </p>
    </section>
  )
}
