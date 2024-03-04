import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: localStorage.getItem('authToken') || null,
    user: localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')!) : null,
    role: 'admin',
    isAuthModalClosed: false,
    allRequests: null,
    allUsers: null,
    testUser: null,
    executors: null,
  }),
  getters: {
    isLoggedIn: state => !state.token, // изменить условие когда будет готова авторизация!
    getRole: state => state.role,
    getRequests: state => state.allRequests,
    getUser: state => state.testUser,
    getExecutors: state => state.executors,
    getUsers: state => state.allUsers,
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
    async loadRequests() {
      const response = await fetch('http://62.217.178.20/requests', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      this.allRequests = data;
    },
    async loadUser() {
      const response = await fetch('http://62.217.178.20/users/3', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      this.testUser = data;
    },
    async loadUsers() {
      const response = await fetch('http://62.217.178.20/users', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      this.allUsers = data;
    },
    async loadExecutors() {
      const response = await fetch('http://62.217.178.20/executors', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      this.executors = data;
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
