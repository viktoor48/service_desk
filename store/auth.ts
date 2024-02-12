import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: null,
    user: null,
  }),
  getters: {
    isLoggedIn: state => !!state.token,
  },
  actions: {
    async login(email: any, password: any) {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })
      const data = await response.json()
      this.token = data.token
      this.user = data.user
    },
    logout() {
      this.token = null
      this.user = null
    },
  },
})
