'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Menu, X, LogOut, Settings } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const { data: session } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-bold text-naconek-gold">
            <div className="h-8 w-8 rounded bg-naconek-gold" />
            <span className="hidden sm:inline">NACONEK</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <span className="text-sm text-muted-foreground">
                {session.user.name || session.user.email}
              </span>
              <div className="hidden md:flex gap-2">
                <Button variant="ghost" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </>
          ) : (
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          )}
        </div>
      </div>

      {isMenuOpen && session?.user && (
        <div className="border-t md:hidden">
          <div className="flex flex-col gap-2 p-4">
            <Button variant="ghost" className="justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => signOut({ redirect: true, callbackUrl: '/login' })}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}
