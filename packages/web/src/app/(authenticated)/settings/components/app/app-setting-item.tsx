import Image from 'next/image';
import { AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
import AccountConnectionSwitcher from './account-connection-switcher';
import EnableLabel from './enable-label';

interface Props {
  app: string;
  image: string;
  label: string;
  className: string;
  isEnabled: boolean;
  deleteAction: (payload: FormData) => void;
  isPending: boolean;
}

export default function AppSettingItem({ app, label, isEnabled, deleteAction, isPending }: Props) {
  return (
    <AccordionItem value={app}>
      <AccordionTrigger className='hover:no-underline'>
        <div className='flex w-full items-center justify-between pr-2'>
          <div className='flex items-center gap-2'>
            <Image src={`/app-logo/${app}.svg`} width={40} height={40} alt={`app-${app}`} />
            <h3 className='text-xl'>{label}</h3>
          </div>
          <EnableLabel isEnabled={isEnabled} />
        </div>
      </AccordionTrigger>
      <AccordionContent className='flex flex-col gap-6 sm:pl-6'>
        <p>
          {app === 'github'
            ? '未読の通知を取得します。'
            : '連携したサーバーでメンションされたメッセージを取得します。'}{' '}
          <br /> ALL INがメッセージの内容を保存することはありませんでご安心ください。
        </p>
        <AccountConnectionSwitcher
          app={app}
          isEnabled={isEnabled}
          deleteAction={deleteAction}
          isPending={isPending}
        />
      </AccordionContent>
    </AccordionItem>
  );
}
