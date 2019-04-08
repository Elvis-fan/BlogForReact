import Cookies from 'universal-cookie'
export const setSignIn = (data: any) => {
  localStorage.setItem('sign_in', data)
}
export const getSignIn = () => {
  return localStorage.getItem('sign_in')
}
export const setToken = (data: any) => {
  const cookies = new Cookies()
  cookies.set('token', data, { path: '/' })
}
export const getToken = () => {
  const cookies = new Cookies()
  return cookies.get('token')
}
