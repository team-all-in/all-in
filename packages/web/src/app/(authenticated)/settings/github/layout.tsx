import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import BackLink from '../components/back-link';

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <article>
      <BackLink place='設定一覧' href='/settings' />
      <div className='space-y-3 px-3'>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>GitHub連携設定</CardTitle>
          </CardHeader>
          <CardContent>{children}</CardContent>
        </Card>
      </div>
    </article>
  );
}
