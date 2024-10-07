import type { LucideIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { cn } from '~/libs/classes';

export default function ActionButton({
  Icon,
  text,
  className,
  handleClick,
}: {
  Icon: LucideIcon;
  text?: string;
  className?: string;
  handleClick: () => void;
}) {
  return (
    <button
      className={cn(
        'flex items-center gap-1.5 rounded-md p-1 duration-200 hover:bg-black/10',
        className,
      )}
      onClick={handleClick}
      type='button'
    >
      <Icon className='size-5' />
      {text}
    </button>
  );
}
