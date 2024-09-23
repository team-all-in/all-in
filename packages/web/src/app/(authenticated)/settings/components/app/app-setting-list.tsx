'use client';

import { useActionState, useEffect, useState } from 'react';
import { Accordion } from '~/components/ui/accordion';
import { Skeleton } from '~/components/ui/skeleton';
import deleteSettingsAction from '../../actions/deleteSettings';
import { getAppSettings } from '../../data/get-app-settings';
import AppSettingItem from './app-setting-item';

const buttonList = [
  {
    app: 'discord',
    image: 'discordwhite',
    label: 'Discord',
    className: 'bg-[#5563FF] p-3',
  },
  {
    app: 'github',
    image: 'github',
    label: 'GitHub',
    className: 'bg-card',
  },
  {
    app: 'slack',
    image: 'slack',
    label: 'Slack',
    className: 'bg-white p-4 border',
  },
];

export default function AppSettingList() {
  const [_, deleteAction, isPending] = useActionState(deleteSettingsAction, '');
  const [appSettings, setAppSettings] = useState<{
    discord: boolean;
    slack: boolean;
    github: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchAppSettings = async () => {
      try {
        const data = await getAppSettings();
        setAppSettings(data);
      } catch (error) {
        console.error('アプリ設定の取得に失敗しました:', error);
      }
    };

    fetchAppSettings();
  }, []);

  return (
    <div className='rounded-xl border border-neutral px-2'>
      {appSettings && !isPending ? (
        <Accordion type='single' collapsible className='w-full'>
          {buttonList.map(button => {
            const isEnabled = appSettings[button.app as keyof typeof appSettings];

            return (
              <AppSettingItem
                key={button.app}
                {...button}
                isEnabled={isEnabled}
                deleteAction={deleteAction}
                isPending={isPending}
              />
            );
          })}
        </Accordion>
      ) : (
        <div className='flex flex-col gap-2 py-2'>
          <Skeleton className='h-16 w-full' />
          <Skeleton className='h-16 w-full' />
          <Skeleton className='h-16 w-full' />
        </div>
      )}
    </div>
  );
}
