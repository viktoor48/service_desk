import { defineStore } from 'pinia'
import type { Order } from '~/types/index'

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    targetRequest: null as any | null,
  }),
  getters: {
    getTargetRequest: state => state.targetRequest,
  },
  actions: {
    setTargetRequest(order: Order) {
      this.targetRequest = order
    },
  },
})
