import { Check } from 'lucide-react';
import { Badge } from '~/components/ui/badge';

export default function EnableLabel() {
  return (
    <Badge className='-top-1 -right-1 absolute border-green-500 bg-card p-1 text-green-500'>
      <Check strokeWidth={2.5} size={16} />
    </Badge>
  );
}
