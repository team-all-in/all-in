import { FilterItems } from './items';

export default function SpFilter() {
  return (
    <aside className='fixed right-1/2 bottom-6 z-50 flex w-[calc(100%-60px)] translate-x-1/2 gap-1 rounded-full border border-card bg-muted/70 px-2.5 py-2 backdrop-blur sm:hidden'>
      <FilterItems />
    </aside>
  );
}
