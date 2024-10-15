import type { LucideIcon } from 'lucide-react';
import { cn } from '~/libs/classes';

type SubmitType = {
  type: 'submit';
};
type ButtonType = {
  type: 'button';
  handleClick?: () => void;
};

export default function ActionButton( props : {
  Icon: LucideIcon;
  text?: string;
  className?: string;
  disabled?: boolean;
} & (SubmitType | ButtonType)) {
  return (
    <button
      className={cn(
        'flex items-center gap-1.5 rounded-md p-1 duration-200 hover:bg-black/10',
        props.className
      )}
      onClick={props.type === 'button' ? props.handleClick : undefined}
      type={props.type}
      disabled={props.disabled}
    >
      <props.Icon className="size-5" />
      {props.text}
    </button>
  );
}
