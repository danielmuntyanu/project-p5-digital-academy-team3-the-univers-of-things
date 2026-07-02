import { describe, test, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../../stores/auth-store'

describe('useAuthStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    const auth = useAuthStore()

    auth.initAuth()
  })

  test('should show that user is not logged yet', () => {
    const auth = useAuthStore()
    expect(auth.isLoggedIn).toBe(false)
    expect(auth.user).toBe(null)
  })

  test('should login to account and show users name', async () => {
    const auth = useAuthStore()
    await auth.login("daniel@nexus.com", "111222333")
    expect(auth.isLoggedIn).toBe(true)
    expect(auth.user.fullName).toBe('Daniel')
  })

  test('should login and logout then and show logged status as false', async () => {
    const auth = useAuthStore()
    await auth.login("daniel@nexus.com", "111222333")
    expect(auth.isLoggedIn).toBe(true)

    await auth.logout()
    expect(auth.isLoggedIn).toBe(false)


  })

})
