'use client';

import { useState } from 'react';
import { saveGithubSettings } from '~/server/github/saveGithubSettings';

export default function GitHubSetting() {
  const [patToken, setPatToken] = useState('');

  const handleSave = async () => {
    await saveGithubSettings(patToken);
  };

  return (
    <div className='flex flex-col items-center'>
      <div className='mt-4 h-16 w-16 rounded-full bg-[length:40px_40px] bg-[url("/app-logo/github.svg")] bg-black bg-center bg-no-repeat lg:mt-16' />
      <div className='mt-8 font-bold text-black text-xs'>アクセストークンを入力してください</div>
      <div className='mt-2 border'>
        <input
          type='password'
          className='text-black'
          value={patToken}
          onChange={e => setPatToken(e.target.value)}
        />
      </div>
      <div className='mt-6'>
        <button
          onClick={handleSave}
          type='button'
          className='rounded-md bg-black px-6 py-1 text-white'
        >
          Save
        </button>
      </div>
    </div>
  );
}
