import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: localStorage.getItem('authToken') || null,
    user: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null,
    role: 'admin',
    isAuthModalClosed: false,
  }),
  getters: {
    isLoggedIn: state => !state.token, // изменить условие когда будет готова авторизация!
    getRole: state => state.role,
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

      // Сохраняем токен в локальном хранилище
      localStorage.setItem('authToken', data.token)
      // Сохраняем данные пользователя в локальном хранилище
      localStorage.setItem('userData', JSON.stringify(data.user))
    },
    async getRequests() {
      const response = await fetch('http://62.217.178.20/requests', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      console.log(data)
    },
    logout() {
      this.token = null
      this.user = null
      // Удаляем данные из локального хранилища при выходе
      localStorage.removeItem('authToken')
      localStorage.removeItem('userData')
    },
    setAuthModalClosed(value: boolean) {
      this.isAuthModalClosed = value
    },
    async loadUserData() {
      // Загружаем данные пользователя из API
      const response = await fetch('/api/userData', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      const userData = await response.json()
      // Сохраняем данные пользователя в хранилище
      this.user = userData
      localStorage.setItem('userData', JSON.stringify(userData))
    },
  },
})
