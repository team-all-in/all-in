import dayjs from 'dayjs';

export default function Time({ send_at }: { send_at: string }) {
  return <span className=''>{dayjs(send_at).format('H:mm')}</span>;
}
