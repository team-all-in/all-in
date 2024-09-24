import { Skeleton } from '~/components/ui/skeleton';

export default function MessageSkelton() {
  const num = 20;

  return (
    <>
      {[...Array(num)].map((n, _i) => (
        <Skeleton key={n} className='h-72 w-full sm:h-40' />
      ))}
    </>
  );
}
