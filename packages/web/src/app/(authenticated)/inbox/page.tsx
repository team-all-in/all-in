import { getMessages } from './data/getMessages';

export default async function Inbox() {
  const messages = await getMessages();
  console.log('messages', messages);

  return (
    <div className='h-dvh space-y-2 overflow-y-auto p-3 pt-32 sm:pt-14'>
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
      <div className='h-10 w-full border' />
    </div>
  );
}
