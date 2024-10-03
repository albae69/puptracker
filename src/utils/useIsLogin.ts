export default function useIsLogin() {
  const token = localStorage.getItem('token')

  const isLogin = token != null

  return { isLogin, token }
}
