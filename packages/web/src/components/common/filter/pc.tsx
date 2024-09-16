import { FilterItems } from './items';

export default function PcFilter() {
  return (
    <aside className='z-10 mt-[40] hidden flex-col gap-2 border-r p-2 pt-16 sm:flex'>
      <FilterItems />
    </aside>
  );
}
