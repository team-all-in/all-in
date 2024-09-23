export default function MessageItemContent({ content }: { content: string }) {
  return <p className='line-clamp-2 break-all'>{content}</p>;
}
