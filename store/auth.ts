import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    token: localStorage.getItem('authToken') || null,
    user: localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData')!)
      : null,
    role: 'admin',
    isAuthModalClosed: false,
    allRequests: null,
    allUsers: null,
    testUser: null,
    executors: null,
    targetRequest: null as any | null,
  }),
  getters: {
    isLoggedIn: state => state.user, // изменить условие когда будет готова авторизация!
    getRole: state => state.role,
    getRequests: state => state.allRequests,
    getUser: state => state.user,
    getExecutors: state => state.executors,
    getUsers: state => state.allUsers,
    getTargetRequest: state => state.targetRequest,
  },
  actions: {
    setTargetRequest(order: any) {
      this.targetRequest = order
    },
    async login(login: any, password: any) {
      const response = await fetch('http://localhost:8000/authorization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      })

      if (!response.ok)
        return false

      const data = await response.json()

      this.user = data
      console.log(this.user)
      localStorage.setItem('userData', JSON.stringify(this.user))
      return true
    },
    async createRequest() {
      const requestData = {
        type_request_id: 1,
        status: 'Новая',
        description: 'Не работает интернет',
        cabinet: '101',
        number_building: '1',
        device_id: 1,
        teacher_id: 1,
      }

      try {
        const response = await fetch('http://localhost:8000/create/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        })

        if (!response.ok)
          throw new Error('Ошибка создания заявки')

        const responseData = await response.json()
        console.log(responseData.message) // Выводим сообщение об успешном создании заявки
      }
      catch (error: any) {
        console.error('Произошла ошибка:', error.message)
      }
    },
    async fetchRequests() {
      try {
        const response = await fetch('http://localhost:8000/get/requests', {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        if (!response.ok)
          throw new Error('Network response was not ok')

        const data = await response.json()
        this.allRequests = data
        console.log(this.allRequests)
      }
      catch (e: any) {
        console.log(e.message)
      }
    },
    async loadUser() {
      const response = await fetch('http://62.217.178.20/users/3', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      this.testUser = data
    },
    async loadUsers() {
      const response = await fetch('http://62.217.178.20/users', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      this.allUsers = data
    },
    async loadExecutors() {
      const response = await fetch('http://62.217.178.20/executors', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      this.executors = data
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
