import { type FieldMetadata, unstable_useControl as useControl } from '@conform-to/react';
import { type ElementRef, useRef } from 'react';
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group';

export function StyleRadio({
  meta,
  items,
}: {
  meta: FieldMetadata<string>;
  items: Array<{ value: string; label: string }>;
}) {
  const radioGroupRef = useRef<ElementRef<typeof RadioGroup>>(null);
  const control = useControl(meta);

  return (
    <>
      <input
        ref={control.register}
        name={meta.name}
        defaultValue={meta.initialValue}
        tabIndex={-1}
        className='sr-only'
        onFocus={() => {
          radioGroupRef.current?.focus();
        }}
      />
      <RadioGroup
        ref={radioGroupRef}
        className='flex flex-wrap items-center gap-2'
        value={control.value ?? ''}
        onValueChange={control.change}
        onBlur={control.blur}
      >
        {items.map(item => {
          return (
            <div key={item.value}>
              <label
                className='flex cursor-pointer items-center gap-2 rounded-full border px-4 py-3 transition duration-200 hover:bg-muted/30'
                htmlFor={`${meta.id}-${item.value}`}
              >
                <RadioGroupItem value={item.value} id={`${meta.id}-${item.value}`} />
                {item.label}
              </label>
            </div>
          );
        })}
      </RadioGroup>
    </>
  );
}
