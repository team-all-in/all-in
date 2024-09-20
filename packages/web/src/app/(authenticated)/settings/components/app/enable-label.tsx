import { Check, CircleDashed } from 'lucide-react';
import { Badge } from '~/components/ui/badge';

type Props = {
  isEnabled?: boolean
}

export default function EnableLabel({isEnabled}: Props) {
  return (
    <>
      {isEnabled ?
        (
          <Badge className='bg-green-400 border-white px-2 py-1.5 text-white flex gap-1 hover:bg-green-400'>
            <Check strokeWidth={2.5} size={16} />
            連携済み
          </Badge>
        ):(
          <Badge className='bg-gray-400 border-white px-2 py-1.5 text-white flex gap-1 hover:bg-gray-400'>
            <CircleDashed strokeWidth={2.5} size={16} />
            未連携
          </Badge>
        )
      }
    </>

  );
}
