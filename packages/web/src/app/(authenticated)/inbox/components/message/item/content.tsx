import React from 'react';

export default function Content({ content }: { content: string }) {
  return <p className='line-clamp-2 break-all'>{content}</p>;
}
