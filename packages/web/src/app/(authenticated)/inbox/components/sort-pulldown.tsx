'use client';

import { useQueryState } from 'nuqs';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

export default function SortPullDown() {
  const [sort, setSort] = useQueryState('sort');

  // null の場合に "time" を設定する
  const defaultSortValue = sort ?? 'time';

  return (
    <div className='fixed top-2 right-16 z-50'>
      <Select
        defaultValue={defaultSortValue}
        onValueChange={value => setSort(value)} // 選択が変わった際に setSort を呼び出す
      >
        <SelectTrigger className='h-10 w-[180px]'>
          <SelectValue className='bg-muted' placeholder='並び替え' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>並び替え</SelectLabel>
            <SelectItem value='time'>時間順</SelectItem>
            <SelectItem value='priority'>優先度順</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
