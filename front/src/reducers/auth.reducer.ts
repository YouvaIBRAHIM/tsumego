import {
  fetchAccess,
  fetchCheckAuth,
  fetchLogout,
  fetchRegister,
} from "@src/services/apis/auth.api"
import { create } from "zustand"

import { AuthState } from "@src/types/user.type"

const user = localStorage.getItem("user")

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: user ? JSON.parse(user) : null,
  setToken: (token) => set({ token }),
  setUser: (user) => set({ user }),
  login: async (username, password) => {
    try {
      const data = await fetchAccess(username, password)
      set({ user: data.user })
      localStorage.setItem("user", JSON.stringify(data.user))
    } catch (error) {
      console.error("Login failed:", error)
    }
  },
  register: async (user) => {
    try {
      const data = await fetchRegister(user)
      set({ user: data.user })
      localStorage.setItem("user", JSON.stringify(data.user))
    } catch (error) {
      console.error("Registration failed:", error)
    }
  },
  logout: async () => {
    try {
      await fetchLogout()
      set({ token: null, user: null })
      localStorage.removeItem("user")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  },
  initializeAuth: async () => {
    try {
      const data = await fetchCheckAuth()
      set({ user: data.user })
      localStorage.setItem("user", JSON.stringify(data.user))
    } catch (error) {
      set({ user: null })
    }
  },
}))
