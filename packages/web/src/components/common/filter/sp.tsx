import { FilterItems } from './items';

export default function SpFilter() {
  return (
    <aside className='fixed top-14 right-1/2 flex translate-x-1/2 gap-1 rounded-full border p-1.5 px-2 backdrop-blur sm:hidden'>
      <FilterItems />
    </aside>
  );
}
