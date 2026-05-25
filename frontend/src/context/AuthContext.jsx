import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { jwtDecode } from '../utils/jwt'
import { login as loginApi, register as registerApi } from '../api/auth'
import { setAuthToken, setUnauthorizedHandler } from '../api/axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [sessionMessage, setSessionMessage] = useState('')

  useEffect(() => {
    setAuthToken(token)
  }, [token])

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setToken(null)
      setUser(null)
      setSessionMessage('Sesion expirada')
    })
  }, [])

  async function login(credentials) {
    const data = await loginApi(credentials)
    setToken(data.access_token)
    const decoded = jwtDecode(data.access_token)
    setUser({ email: decoded.sub, nombre: decoded.sub, is_admin: false })
    setSessionMessage('')
    return data
  }

  async function register(payload) {
    const data = await registerApi(payload)
    setToken(data.token)
    setUser({ id: data.id, email: data.email, nombre: data.nombre, is_admin: false })
    setSessionMessage('')
    return data
  }

  function logout() {
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({ token, user, isAuthenticated: Boolean(token), sessionMessage, login, register, logout, setUser }),
    [token, user, sessionMessage],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}

