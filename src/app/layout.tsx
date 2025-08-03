// @ts-nocheck
import './globals.css'

export const metadata = {
  title: 'Intelcobro S.A. - Conecta con el futuro de la cobranza',
  description: 'Sistema inteligente de cobranza con IA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}