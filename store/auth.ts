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
    teachersRequest: null,
    typeRequests: null,
    devices: null,
    targetEmployer: null,
  }),
  getters: {
    isLoggedIn: state => state.user,
    getRole: state => state.role,
    getRequests: state => state.allRequests,
    getUser: state => state.user,
    getWorkers: state => state.workers,
    getUsers: state => state.allUsers,
    getTargetRequest: state => state.targetRequest,
    getTeachers: state => state.teachers,
    getTeachersRequest: state => state.teachersRequest,
    getTypeRequest: state => state.typeRequests,
    getDevices: state => state.devices,
    getTargetEmployer: state => state.targetEmployer,
  },
  actions: {
    setTargetRequest(order: any) {
      this.targetRequest = order
    },
    setTargetEmployer(employer: any) {
      this.targetEmployer = employer
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

      this.user = data.user
      console.log(this.user)
      localStorage.setItem('userData', JSON.stringify(this.user))
      return true
    },
    async createRequest(requestData: any) {
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
        console.log(responseData.message)
        return responseData
      }
      catch (error: any) {
        console.error('Произошла ошибка:', error.message)
      }
    },
    async editRequest(requestId: any, requestData: any) {
      try {
        const response = await fetch(
          `http://localhost:8000/edit/request/${requestId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
          },
        )

        if (!response.ok)
          throw new Error('Failed to edit request')

        const responseData = await response.json()
        console.log(responseData)

        console.log('Success')
        return responseData
      }
      catch (error) {
        console.error('Error edit request:', error)
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
    async deleteEmployer(data: any) {
      try {
        const response = await fetch('http://localhost:8000/delete/employer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Unknown error occurred')
        }

        const responseData = await response.json()
        return true
      }
      catch (error: any) {
        console.error(error)
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
    async fetchRequestsTeacher(teacherId: any) {
      try {
        const response = await fetch(
          `http://localhost:8000/get/teacherRequests/${teacherId}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        if (!response.ok)
          throw new Error('Network response was not ok')

        const data = await response.json()
        this.teachersRequest = data
        return data
      }
      catch (error: any) {
        console.log(error.message)
      }
    },
    async fetchTypeRequests() {
      try {
        const response = await fetch(
          'http://localhost:8000/api/type_requests',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        if (!response.ok)
          throw new Error('Network response was not ok')

        const data = await response.json()
        this.typeRequests = data['hydra:member']
      }
      catch (error: any) {
        console.log(error)
      }
    },
    async fetchDevices() {
      try {
        const response = await fetch(
          'http://localhost:8000/api/devices',
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )

        if (!response.ok)
          throw new Error('Network response was not ok')

        const data = await response.json()
        this.devices = data['hydra:member']
      }
      catch (error: any) {
        console.log(error)
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
    logout() {
      this.user = null
      localStorage.removeItem('userData')
    },
    setAuthModalClosed(value: boolean) {
      this.isAuthModalClosed = value
    },
  },
})
