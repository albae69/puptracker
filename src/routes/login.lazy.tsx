import ErrorMessage from '@/components/error_message'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import supabase from '@/utils/supabase'
import useIsLogin from '@/utils/useIsLogin'
import { AuthError } from '@supabase/supabase-js'
import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useRef, useState } from 'react'

export const Route = createLazyFileRoute('/login')({
  component: Login,
})

export default function Login() {
  const { isLogin } = useIsLogin()

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  const [status, setStatus] = useState<'loading' | ''>('')
  const [isError, setIsError] = useState<AuthError | null>(null)

  async function login() {
    setIsError(null)
    setStatus('loading')

    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
    })

    if (error) {
      setIsError(error)
      setStatus('')
      return
    }

    if (data) {
      localStorage.setItem('token', data.session.access_token)
      window.location.replace('/home')
    }
  }

  if (isLogin) {
    window.location.replace('/home')
    return
  }

  return (
    <section className='p-4 flex flex-col h-screen justify-center'>
      <h1 className='text-2xl font-bold mb-4'>Masuk</h1>
      <Label htmlFor='email'>Email</Label>
      <Input
        ref={emailRef}
        name='email'
        className='mb-4 mt-4'
        type='email'
        placeholder='Email'
      />
      <Label htmlFor='password'>Password</Label>
      <Input
        ref={passwordRef}
        name='password'
        className='my-4'
        type='password'
        placeholder='Password'
      />
      <Button className='mt-2 mb-4' onClick={login}>
        {status == 'loading' ? '💩' : 'Masuk'}
      </Button>
      {isError && <ErrorMessage message={isError.message} />}
      <p className='text-sm text-center'>
        belum punya akun?{' '}
        <Link to='/register' className='underline'>
          daftar dulu ges
        </Link>
      </p>
    </section>
  )
}
