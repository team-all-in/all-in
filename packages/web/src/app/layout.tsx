import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ALL-IN',
  description: '登録しているアプリケーションの通知が一覧で見れます',
  keywords: ['通知', '一覧', 'アプリケーション', '便利', 'メッセージ'],
  openGraph: {
    title: 'ALL-IN',
    description: '登録しているアプリケーションの通知が一覧で見れます',
    url: 'https://all-in-henna.vercel.app/inbox',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
