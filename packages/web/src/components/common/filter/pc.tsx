import { FilterItems } from './items';

export default function PcFilter() {
  return (
    <aside className='mt-[40] hidden flex-col gap-2 border-r p-2 pt-5 sm:flex'>
      <FilterItems />
    </aside>
  );
}
