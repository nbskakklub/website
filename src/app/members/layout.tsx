export const metadata = {
  title: 'Medlemmer',
  description: 'Nørrebro skakklub medlemmer',
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
