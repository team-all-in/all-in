export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='z-0 h-screen bg-white pt-14'>{children}</div>;
}
