import { describe, test, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../../stores/auth'

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  test('usuario no está logueado por defecto', () => {
    const auth = useAuthStore()
    expect(auth.isLoggedIn).toBe(false)
    expect(auth.user).toBe(null)
  })

  test('al hacer login el usuario pasa a estar logueado', () => {
    const auth = useAuthStore()
    auth.login({ name: 'Luffy', avatar: 'url-avatar' })
    expect(auth.isLoggedIn).toBe(true)
    expect(auth.user.name).toBe('Luffy')
  })

  test('al hacer logout el usuario deja de estar logueado', () => {
    const auth = useAuthStore()
    auth.login({ name: 'Luffy' })
    auth.logout()
    expect(auth.isLoggedIn).toBe(false)
    expect(auth.user).toBe(null)
  })

  test('usuario logueado tiene datos de usuario', () => {
    const auth = useAuthStore()
    auth.login({ name: 'Luffy', avatar: 'url-avatar' })
    expect(auth.user).not.toBe(null)
    expect(auth.user.name).toBeDefined()
  })
})
