import Link from "next/link";
import Filter from "~/components/common/filter";

export default function InboxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden flex-col sm:flex-row">
      <Link href="/settings" className="fixed top-2 right-3 z-50">
        settings
      </Link>

      <Filter />
      <main className="flex-1">{children}</main>
    </div>
  );
}
