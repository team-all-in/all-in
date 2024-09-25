export default function MessageItemContent({
  content,
  message_link,
}: {
  content: string;
  message_link: string;
}) {
  if (!content) {
    return (
      <div className='text-red-500 text-sm'>
        <p>メッセージを取得できませんでした。</p>
        <div>
          <a
            href={message_link}
            target='_blank'
            rel='noreferrer'
            className='cursor-pointer underline underline-offset-4'
          >
            元のメッセージ
          </a>
          <span>を確認してください。</span>
        </div>
      </div>
    );
  }

  return <p className='line-clamp-2 break-all text-sm'>{content}</p>;
}
