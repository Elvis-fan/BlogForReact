import Cookies from 'universal-cookie'
const cookies = new Cookies()
export const setSignIn = (data: any) => {
  localStorage.setItem('sign_in', data)
}
export const getSignIn = () => {
  return localStorage.getItem('sign_in')
}
export const setToken = (data: any) => {
  cookies.set('token', data, { path: '/' })
}
export const getToken = () => cookies.get('token')
