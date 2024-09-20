import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '~/components/ui/accordion';
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
    label: 'GtiHub',
    className: 'bg-card',
  },
  {
    app: 'slack',
    image: 'slack',
    label: 'Slack',
    className: 'bg-white p-4 border',
  },
];

export default async function AppSettingList() {
  const appSettings = await getAppSettings();

  return (
    <div className='border border-neutral rounded-xl px-2'>
      <Accordion type="single" collapsible className="w-full">
        {buttonList.map(button => {
          const isEnabled = appSettings[button.app as keyof typeof appSettings];

          return <AppSettingItem key={button.app} {...button} isEnabled={isEnabled} />;
        })}
      </Accordion>
    </div>
  );
}
