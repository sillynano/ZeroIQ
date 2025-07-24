"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/auth-provider"
import { User, Lock, LogOut } from "lucide-react"

export function UserAccount() {
  const { currentUser, login, logout } = useAuth()
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [loginType, setLoginType] = useState<"guest" | "project-owner">("guest")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")

  const handleLogin = () => {
    setLoginError("")
    
    if (loginType === "guest") {
      const success = login("guest")
      if (success) {
        setShowLoginDialog(false)
        setPassword("")
      }
    } else if (loginType === "project-owner") {
      const success = login("project-owner", password)
      if (success) {
        setShowLoginDialog(false)
        setPassword("")
      } else {
        setLoginError("Incorrect password!")
      }
    }
  }

  const handleLogout = () => {
    logout()
    setPassword("")
  }

  const openLoginDialog = (type: "guest" | "project-owner") => {
    setLoginType(type)
    setShowLoginDialog(true)
    setLoginError("")
    setPassword("")
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">
              {currentUser === "guest" ? "Guest" : "Silly Nano"}
            </span>
            <Badge variant="secondary" className="ml-1 text-xs">
              {currentUser === "guest" ? "G" : "SN"}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          {currentUser === "guest" ? (
            <DropdownMenuItem onClick={() => openLoginDialog("project-owner")}>
              <Lock className="h-4 w-4 mr-2" />
              Login as Silly Nano
            </DropdownMenuItem>
          ) : (
            <>
              <div className="px-2 py-1.5 text-sm font-medium">
                Logged in as: Silly Nano
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Switch to Guest
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Login as {loginType === "guest" ? "Guest" : "Silly Nano"}
            </DialogTitle>
            <DialogDescription>
              {loginType === "guest" 
                ? "Guest access allows you to view and rate advice." 
                : "Silly Nano access includes administrative privileges."
              }
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {loginType === "project-owner" && (
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleLogin()
                    }
                  }}
                />
                {loginError && (
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                    {loginError}
                  </p>
                )}
              </div>
            )}
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowLoginDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleLogin}>
                {loginType === "guest" ? "Login as Guest" : "Login as Silly Nano"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
