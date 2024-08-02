'use client';
import Cookies from 'js-cookie'

export const setUserAuth = (user: any, token: string) => {
  Cookies.set('user', JSON.stringify(user), { expires: 7 })
  Cookies.set('token', token, { expires: 7 })
}

export const getUserAuth = () => {
  const user = Cookies.get('user')
  const token = Cookies.get('token')
  return {
    user: user ? JSON.parse(user) : null,
    token: token || null
  }
}

export const removeUserAuth = () => {
  Cookies.remove('user')
  Cookies.remove('token')
}