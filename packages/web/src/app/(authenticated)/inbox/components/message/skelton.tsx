import { Skeleton } from '~/components/ui/skeleton';

export default function MessageSkelton() {
  const num = 20;

  return (
    <div className='space-y-3 pt-16'>
      {[...Array(num)].map((n, _i) => (
        <Skeleton key={n} className='h-36 w-full' />
      ))}
    </div>
  );
}
