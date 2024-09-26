'use client';

import ThemeSettingItem from './theme-setting-item';

const themeList = [
  {
    theme: 'light',
    label: 'ライト',
    className: '',
  },
  {
    theme: 'dark',
    label: 'ダーク',
    className: 'sm:px-12',
  },
  {
    theme: 'system',
    label: 'システム',
    className: '',
  },
];

export default function ThemeSettingList() {
  return (
    <div className='flex rounded-xl border border-neutral p-8'>
      {themeList.map(theme => {
        return <ThemeSettingItem key={theme.theme} {...theme} />;
      })}
    </div>
  );
}
