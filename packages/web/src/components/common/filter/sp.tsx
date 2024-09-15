import { FilterItems } from './items';

export default function SpFilter() {
  return (
    <aside className='fixed bottom-4 right-1/2 w-[calc(100%-40px)]  flex translate-x-1/2 gap-1 rounded-full border border-neutral-400 p-1.5 px-2 backdrop-blur sm:hidden z-50 bg-white'>
      <FilterItems />
    </aside>
  );
}
