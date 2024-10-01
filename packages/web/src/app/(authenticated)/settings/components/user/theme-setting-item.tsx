'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';
import { Label } from '~/components/ui/label';

interface Props {
  theme: string;
  label: string;
  className: string;
}

export default function ThemeSettingItem({ theme, label, className }: Props) {
  const { setTheme, theme: currentTheme } = useTheme();
  return (
    <Label className={`${className}`}>
      <Image src={`/theme/${theme}.svg`} alt='' width={150} height={150} />
      <div className='mt-2 flex items-center'>
        <input
          type='radio'
          name='theme'
          onClick={() => setTheme(theme)}
          checked={currentTheme === theme}
        />
        <p className='mx-3 text-sm'>{label}</p>
      </div>
    </Label>
  );
}
