import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ALL-IN',
  description: 'すべての会話を、ひとつの場所に。',
  keywords: ['通知', '一覧', 'アプリケーション', '便利', 'メッセージ'],
  openGraph: {
    title: 'ALL-IN',
    description: 'すべての会話を、ひとつの場所に。',
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
