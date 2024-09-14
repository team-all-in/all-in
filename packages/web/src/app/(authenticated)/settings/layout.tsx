import Link from "next/link";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pt-14 p-3">
      <Link href="/inbox">← back to inbox</Link>
      {children}
    </div>
  );
}
