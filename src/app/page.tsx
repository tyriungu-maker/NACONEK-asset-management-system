'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/navigation/Header'
import { Package, BarChart3, Shield, Zap } from 'lucide-react'

export default function Home() {
  const { data: session } = useSession()

  if (session?.user) {
    return (
      <>
        <Header />
        <div className="flex h-screen">
          <div className="flex-1">
            <div className="container mx-auto py-8 px-4">
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Welcome, {session.user.name}!</h1>
                <p className="text-muted-foreground mt-2">
                  NACONEK Enterprise Asset Management System
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground mt-1">Assets in system</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Missing Assets</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-500">0</div>
                    <p className="text-xs text-muted-foreground mt-1">Reported missing</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground mt-1">Ongoing audits</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">100%</div>
                    <p className="text-xs text-muted-foreground mt-1">System status</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>
                      Common tasks for asset management
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Link href="/assets/new" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Package className="mr-2 h-4 w-4" />
                        Register New Asset
                      </Button>
                    </Link>
                    <Link href="/audits/new" className="block">
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="mr-2 h-4 w-4" />
                        Start Audit Campaign
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>System Features</CardTitle>
                    <CardDescription>
                      Key capabilities available
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-naconek-gold" />
                      <span>Asset Register Management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-naconek-gold" />
                      <span>QR Code & Barcode Tagging</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-naconek-gold" />
                      <span>Comprehensive Auditing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-naconek-gold" />
                      <span>GIS Asset Mapping</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted px-4">
        <div className="text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              <span className="text-naconek-gold">NACONEK</span>
              <br />
              Asset Management System
            </h1>
            <p className="text-xl text-muted-foreground">
              Enterprise-grade asset lifecycle management for NACONEK
            </p>
          </div>

          <div className="space-y-4 pt-6">
            <Link href="/login">
              <Button size="lg" className="bg-naconek-gold hover:bg-naconek-gold-dark">
                Sign In to Dashboard
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-12">
            <Card>
              <CardHeader>
                <Package className="h-8 w-8 text-naconek-gold mb-2" />
                <CardTitle className="text-lg">Asset Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Centralized registry for all NACONEK assets
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-naconek-gold mb-2" />
                <CardTitle className="text-lg">Auditing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Comprehensive audit trails and verification
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="h-8 w-8 text-naconek-gold mb-2" />
                <CardTitle className="text-lg">Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Real-time insights and reporting
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
