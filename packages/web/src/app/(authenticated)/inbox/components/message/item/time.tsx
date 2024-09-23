import dayjs from 'dayjs';
import React from 'react';

export default function Time({ send_at }: { send_at: string }) {
  return <span className=''>{dayjs(send_at).format('HH:mm')}</span>;
}
