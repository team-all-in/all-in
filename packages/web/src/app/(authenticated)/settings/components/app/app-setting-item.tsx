import { AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import Image from 'next/image';
import EnableLabel from './enable-label';
import { Button } from '~/components/ui/button';
import { RotateCw, Trash } from 'lucide-react';
import Link from 'next/link';
import AccountConnectionSwitcher from './account-connection-switcher';

interface Props {
  app: string;
  image: string;
  label: string;
  className: string;
  isEnabled: boolean;
}

export default function AppSettingItem({ app, image, label, className, isEnabled }: Props) {
  return (
    <AccordionItem value={app}>
      <AccordionTrigger className='hover:no-underline'>
        <div className='w-full pr-2 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Image src={`/app-logo/${app}.svg`} width={40} height={40} alt={`app-${app}`} />
            <h3 className='text-xl'>{label}</h3>
          </div>
          <EnableLabel isEnabled={isEnabled}/>
        </div>
      </AccordionTrigger>
      <AccordionContent className='sm:pl-6 flex flex-col gap-6'>
        <p>{isEnabled ? "連携したチャンネルでメンションされたメッセージを取得します。" : "未読の通知を取得します。"} <br/> ALL INが通知の内容を保存することはありませんでご安心ください。</p>
        <AccountConnectionSwitcher app={app} isEnabled={isEnabled}/>
      </AccordionContent>
    </AccordionItem>
  );
}
