import type { Metadata } from 'next';
import './globals.css';
import { Noto_Sans_JP } from 'next/font/google';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
});

export const metadata: Metadata = {
  title: {
    template: '%s | ALL IN',
    default: 'ALL IN',
  },
  description: 'すべての会話を、ひとつの場所に。',
  keywords: ['通知', '一覧', 'アプリケーション', '便利', 'メッセージ'],
  openGraph: {
    title: 'ALL IN',
    description: 'すべての会話を、ひとつの場所に。',
    url: 'https://all-in-henna.vercel.app/inbox',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ja'>
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
}
