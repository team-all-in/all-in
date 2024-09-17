import { Info } from 'lucide-react';
import { Badge } from '~/components/ui/badge';

export default function InfoMessage() {
  return (
    <Badge variant='destructive' className='fixed top-20 right-1/2 z-50 translate-x-1/2'>
      <Info className='mr-1 size-4' />
      現在ダミーデータを表示しています🙇
    </Badge>
  );
}
