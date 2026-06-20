export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background to-muted">
      <div className="w-full max-w-md px-4">
        <div className="mb-8 text-center">
          <div className="inline-block h-12 w-12 rounded-lg bg-naconek-gold mb-4" />
          <h1 className="text-2xl font-bold">NACONEK</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Asset Management System
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
