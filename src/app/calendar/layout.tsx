export const metadata = {
  title: 'Kalender',
  description: 'Nørrebro skakklub kalender',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="da">
      <body>{children}</body>
    </html>
  )
}
