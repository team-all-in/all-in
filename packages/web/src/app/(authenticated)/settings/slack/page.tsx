// 'use client';

// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import { deleteSlackSettings } from '~/server/slack/deleteSlackSettings';
// import { getSlackSettings } from '~/server/slack/getSlackSettings';

// const clientId = process.env.NEXT_PUBLIC_SLACK_CLIENT_ID;
// const clientSecret = process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET;
// const redirectUri = process.env.NEXT_PUBLIC_SLACK_REDIRECT_URI;
// // const slackUri = `https://slack.com/oauth/v2/authorize?scope=channels:history,channels:join,channels:read,chat:write,groups:history,groups:read,users:read&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}&tracked=1`;

// export default function SlackSetting() {
//   const baseUrl2 = 'https://slack.com/oauth/v2/authorize';
//   const params = new URLSearchParams({
//     scope: 'channels:history,channels:join,channels:read,chat:write,groups:history,groups:read,users:read',
//     redirect_uri: redirectUri || '',
//     client_id: clientId || '',
//     client_secret: clientSecret || '',
//     tracked: '1'
//   });

//   const slackUri = `${baseUrl2}?${params.toString()}`;

//   console.log(slackUri);

//   const [isConnected, setIsConnected] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const router = useRouter();
//   console.log('Client ID:', clientId);
//   console.log('redirectUri:', redirectUri);
//   useEffect(() => {
//     const checkSlackConnection = async () => {
//       const slackSettings = await getSlackSettings();
//       if (slackSettings) {
//         setIsConnected(true);
//       }
//       setIsLoading(false);
//     };

//     checkSlackConnection();
//   }, []);

//   const handleSlackConnect = async () => {
//     if (isConnected) {
//       const confirmDelete = confirm('Slackの設定を削除しますか？');
//       if (confirmDelete) {
//         await deleteSlackSettings(); // Slack設定の削除API呼び出し
//         setIsConnected(false);
//         router.push('/settings/slack');
//       }
//     } else {
//       const slackConnect = () => {
//         window.location.href = slackUri;

//       };
//       useEffect(() => {
//         slackConnect();
//        }
//        , []);
//       // OAuthのリンクにリダイレクト
//       //  const window.location.href = slackUri;
//     }
//   };

//   console.log('Client ID:', clientId);
//   console.log('Slackuri:', slackUri);
//   console.log(
//     `GGGGGGGG URL: https://slack.com/oauth/v2/authorize?scope=channels:history,channels:join,channels:read,chat:write,groups:history,groups:read,users:read&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}&tracked=1`,
//   );
//   return (
//     <div className='flex flex-col items-center justify-center'>
//       <h1 className='mb-4 font-bold text-xl'>Slack Settings</h1>
//       {isConnected ? (
//         <button
//           onClick={handleSlackConnect}
//           type='button'
//           className='rounded-md bg-red-500 px-4 py-2 text-white'
//         >
//           Disconnect Slack
//         </button>
//       ) : (
//         <button
//           onClick={handleSlackConnect}
//           type='button'
//           className='rounded-md bg-green-500 px-4 py-2 text-white'
//         >
//           Connect Slack
//         </button>
//       )}
//     </div>
//   );
// }

import { redirect } from 'next/navigation';

export default function Slack() {
  const url = 'https://slack.com/oauth/v2/authorize?';

  const client_id = process.env.NEXT_PUBLIC_SLACK_CLIENT_ID || '';
  const clientSecret = process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET || '';
  const redirect_uri = `${process.env.NEXT_PUBLIC_APP_URL}/oauth/slack`;
  const response_type = 'code';
  const scope =
    'channels:history,channels:join,channels:read,chat:write,groups:history,groups:read,users:read';

  const params = new URLSearchParams({
    client_id,
    clientSecret,
    redirect_uri,
    response_type,
    scope,
  });

  const slackOAuthUrl = `${url}${params}`;

  redirect(slackOAuthUrl);
}
