'use client';

import Image from 'next/image';
import { useQueryState } from 'nuqs';
import { cn } from '~/libs/classes';

export const filterItems: string[] = ['discord=', 'slack', 'github'];

const FilterItem = ({ item }: { item: string }) => {
  const [name, setName] = useQueryState('filter');

  const handleClick = () => {
    if (name === item) {
      setName(null);
    } else {
      setName(item);
    }
  };

  return (
    <button
      key={item}
      className={cn(
        'cursor-pointer rounded-full p-1.5 transition duration-200 sm:p-2',
        name === item ? 'bg-primary/25' : 'hover:bg-primary/10',
      )}
      onClick={handleClick}
      type='button'
    >
      <Image
        alt={item}
        src={`/app-logo/${item}.svg`}
        width='35'
        height='35'
        className='aspect-square size-9 sm:size-8'
      />
    </button>
  );
};

export const FilterItems = () => {
  return (
    <>
      {filterItems.map(item => (
        <FilterItem key={item} item={item} />
      ))}
    </>
  );
};
