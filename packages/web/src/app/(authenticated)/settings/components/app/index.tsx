import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import ButtonList from './button-list';

export default async function AppSettings() {
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>連携設定</CardTitle>
      </CardHeader>
      <CardContent className='space-y-10'>
        <ButtonList />
      </CardContent>
    </Card>
  );
}
