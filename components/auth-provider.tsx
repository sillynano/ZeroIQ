"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type UserRole = "guest" | "project-owner" | null

interface AuthContextType {
  currentUser: UserRole
  login: (role: UserRole, password?: string) => boolean
  logout: () => void
  isProjectOwner: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const PROJECT_OWNER_PASSWORD = process.env.NEXT_PUBLIC_PROJECT_OWNER_PASSWORD || "1234"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserRole>("guest")

  // Load saved user from localStorage on mount, default to guest
  useEffect(() => {
    const savedUser = localStorage.getItem('zeroiq-current-user')
    if (savedUser && (savedUser === 'guest' || savedUser === 'project-owner')) {
      setCurrentUser(savedUser as UserRole)
    } else {
      // Auto-login as guest if no saved user
      setCurrentUser("guest")
    }
  }, [])

  // Save user to localStorage whenever currentUser changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('zeroiq-current-user', currentUser)
    } else {
      localStorage.removeItem('zeroiq-current-user')
    }
  }, [currentUser])

  const login = (role: UserRole, password?: string): boolean => {
    if (role === "guest") {
      setCurrentUser("guest")
      return true
    } else if (role === "project-owner") {
      if (password === PROJECT_OWNER_PASSWORD) {
        setCurrentUser("project-owner")
        return true
      } else {
        return false
      }
    }
    return false
  }

  const logout = () => {
    setCurrentUser("guest")
  }

  const isProjectOwner = (): boolean => {
    return currentUser === "project-owner"
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isProjectOwner }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
