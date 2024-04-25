import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: localStorage.getItem('userData')
      ? JSON.parse(localStorage.getItem('userData')!)
      : null,
    role: 'admin',
    isAuthModalClosed: false,
    allRequests: null,
    allUsers: null,
    teachers: null,
    workers: null,
    targetRequest: null as any | null,
  }),
  getters: {
    isLoggedIn: state => state.user, // изменить условие когда будет готова авторизация!
    getRole: state => state.role,
    getRequests: state => state.allRequests,
    getUser: state => state.user,
    getWorkers: state => state.workers,
    getUsers: state => state.allUsers,
    getTargetRequest: state => state.targetRequest,
    getTeachers: state => state.teachers,
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
    async createTeacher(data: any) {
      try {
        const response = await fetch('http://localhost:8000/create/teacher', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok)
          throw new Error('Failed to create teacher')

        const responseData = await response.json()
        console.log(responseData)

        return responseData
      }
      catch (error) {
        console.error('Error creating teacher:', error)
        throw error
      }
    },
    async createWorker(data: any) {
      try {
        const response = await fetch('http://localhost:8000/create/worker', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok)
          throw new Error('Failed to create worker')

        const responseData = await response.json()
        console.log(responseData)

        return responseData
      }
      catch (error) {
        console.error('Error creating worker:', error)
        throw error
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
    async fetchWorkers() {
      const response = await fetch('http://localhost:8000/api/workers', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      this.workers = data['hydra:member']
    },
    async fetchTeachers() {
      const response = await fetch('http://localhost:8000/api/teachers', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await response.json()
      this.teachers = data['hydra:member']
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
    logout() {
      this.user = null
      localStorage.removeItem('userData')
    },
    setAuthModalClosed(value: boolean) {
      this.isAuthModalClosed = value
    },
  },
})
