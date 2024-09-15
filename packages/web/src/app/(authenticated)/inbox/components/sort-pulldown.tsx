"use client"

import { UndoIcon } from "lucide-react";
import { useQueryState } from "nuqs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"

export default function SortPullDown() {
  const [sort, setSort] = useQueryState('sort');

  // null の場合に "time" を設定する
  const defaultSortValue = sort ?? 'time';

  return (
    <div className='fixed top-2 right-16 text-white z-50'>
      <Select
        defaultValue={defaultSortValue}
        onValueChange={(value) => setSort(value)}  // 選択が変わった際に setSort を呼び出す
      >
        <SelectTrigger className="w-[180px] h-10 bg-black rounded-xl">
          <SelectValue placeholder="How to Sort" />
        </SelectTrigger>
        <SelectContent className="bg-black text-white">
          <SelectGroup>
            <SelectLabel>Sort</SelectLabel>
            <SelectItem value="time">Time</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
