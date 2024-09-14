import Header from "~/components/common/header";
import { headerHeight } from "~/components/common/header";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mainStyle = {
    height: `calc(100vh - ${headerHeight}px)`
  }

  return (
    <article>
      <Header />
      <div style={mainStyle}>{children}</div>
    </article>
  );
}
