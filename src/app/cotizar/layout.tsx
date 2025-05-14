export default function LayoutSection({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <main className="w-screen min-h-[75dvh] pt-32 md:pt-36">{children}</main>
}
