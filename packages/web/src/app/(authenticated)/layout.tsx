import Header from '~/components/common/header';

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article>
      <Header />
      <div>{children}</div>
    </article>
  );
}
