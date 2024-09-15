import { FilterItems } from './items';

export default function PcFilter() {
  return (
    <aside className='mt-[40] hidden flex-col gap-2 border-r p-2 pt-14 sm:flex z-10'>
      <FilterItems />
    </aside>
  );
}
