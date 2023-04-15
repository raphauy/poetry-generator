import ClientLayout from '@/components/ClientLayout'

export const metadata = {
  title: 'Generador de poesía',
  description: 'Esta es una aplicación web que utiliza el marco Next.js basado en React, la biblioteca Chakra-UI para la interfaz de usuario y la API OpenAI para generar poesía basada en un tema solicitado por el usuario en el sitio web.',
  icons: {
    icon: '/rapha.uy_favicon_r.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
