// ./app/layout.tsx
import '../styles/globals.css'
import { ReactNode } from 'react'

export const metadata = { title: 'Sistema Interno' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="es"><body>{children}</body></html>
}
