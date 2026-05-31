import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })

export const metadata = {
  title: 'AsesorApp — Tu despacho digital',
  description: 'Plataforma para asesores y sus clientes: documentos, gráficas y portal privado.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0b1120',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
