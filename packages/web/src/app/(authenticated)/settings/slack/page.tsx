'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deleteSlackSettings } from '~/server/slack/deleteSlackSettings';
import { getSlackSettings } from '~/server/slack/getSlackSettings';

const clientId = process.env.SLACK_CLIENT_ID;
const clientSecret = process.env.SLACK_CLIENT_SECRET;
const redirectUri = process.env.SLACK_REDIRECT_URI;
const slackUri = `https://slack.com/oauth/v2/authorize?scope=channels:history,channels:join,channels:read,chat:write,groups:history,groups:read,users:read&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}&tracked=1`;

export default function SlackSetting() {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  console.log('Client ID:', clientId);
  console.log('redirectUri:', redirectUri);
  useEffect(() => {
    const checkSlackConnection = async () => {
      const slackSettings = await getSlackSettings();
      if (slackSettings) {
        setIsConnected(true);
      }
      setIsLoading(false);
    };

    checkSlackConnection();
  }, []);

  const handleSlackConnect = async () => {
    if (isConnected) {
      const confirmDelete = confirm('Slackの設定を削除しますか？');
      if (confirmDelete) {
        await deleteSlackSettings(); // Slack設定の削除API呼び出し
        setIsConnected(false);
        router.push('/settings/slack');
      }
    } else {
      // OAuthのリンクにリダイレクト
      window.location.href = slackUri;
    }
  };
  console.log('Client ID:', clientId);
  console.log('Slackuri:', slackUri);
  console.log(
    `Generated URL: https://slack.com/oauth/v2/authorize?scope=channels:history,channels:join,channels:read,chat:write,groups:history,groups:read,users:read&redirect_uri=${encodeURIComponent(redirectUri)}&client_id=${encodeURIComponent(clientId)}&client_secret=${encodeURIComponent(clientSecret)}&tracked=1`,
  );
  console.log(
    `GGGGGGGG URL: https://slack.com/oauth/v2/authorize?scope=channels:history,channels:join,channels:read,chat:write,groups:history,groups:read,users:read&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}&tracked=1`,
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='mb-4 font-bold text-xl'>Slack Settings</h1>
      {isConnected ? (
        <button
          onClick={handleSlackConnect}
          type='button'
          className='rounded-md bg-red-500 px-4 py-2 text-white'
        >
          Disconnect Slack
        </button>
      ) : (
        <button
          onClick={handleSlackConnect}
          type='button'
          className='rounded-md bg-green-500 px-4 py-2 text-white'
        >
          Connect Slack
        </button>
      )}
    </div>
  );
}
