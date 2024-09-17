import { ArrowUpRight } from 'lucide-react';
import { buttonVariants } from '~/components/ui/button';

export default function FooterLinkItem({ href, text }: { href: string; text: string }) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={buttonVariants({ variant: 'link' })}
    >
      <span className='mr-1'>{text}</span>
      <ArrowUpRight size={14} />
    </a>
  );
}
