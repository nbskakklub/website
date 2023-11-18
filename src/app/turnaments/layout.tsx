export const metadata = {
  title: 'Turneringer',
  description: 'Nørrebro skakklub turneringer',
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
