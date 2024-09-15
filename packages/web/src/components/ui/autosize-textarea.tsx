'use client';

import * as React from 'react';
import { useImperativeHandle } from 'react';
import { cn } from '~/libs/classes';

interface UseAutosizeTextAreaProps {
  textAreaRef: React.RefObject<HTMLTextAreaElement>;
  minHeight?: number;
  maxHeight?: number;
}

const useAutosizeTextArea = ({
  textAreaRef,
  maxHeight = Number.MAX_SAFE_INTEGER,
  minHeight = 0,
}: UseAutosizeTextAreaProps) => {
  const adjustHeight = React.useCallback(() => {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    const offsetBorder = 2;
    textArea.style.height = 'auto';
    const scrollHeight = textArea.scrollHeight;
    textArea.style.height = `${Math.min(scrollHeight + offsetBorder, maxHeight)}px`;
  }, [textAreaRef, maxHeight]);

  React.useEffect(() => {
    const textArea = textAreaRef.current;
    if (!textArea) return;

    const offsetBorder = 2;
    textArea.style.minHeight = `${minHeight + offsetBorder}px`;
    if (maxHeight > minHeight) {
      textArea.style.maxHeight = `${maxHeight}px`;
    }

    adjustHeight();

    // Re-adjust on window resize
    window.addEventListener('resize', adjustHeight);

    return () => {
      window.removeEventListener('resize', adjustHeight);
    };
  }, [textAreaRef, maxHeight, minHeight, adjustHeight]);

  return adjustHeight;
};

export type AutosizeTextAreaRef = {
  textArea: HTMLTextAreaElement;
  focus: () => void;
  maxHeight: number;
  minHeight: number;
};

type AutosizeTextAreaProps = {
  maxHeight?: number;
  minHeight?: number;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const AutosizeTextarea = React.forwardRef<AutosizeTextAreaRef, AutosizeTextAreaProps>(
  (
    {
      maxHeight = Number.MAX_SAFE_INTEGER,
      minHeight = 52,
      className,
      onChange,
      value = '',
      ...props
    }: AutosizeTextAreaProps,
    ref: React.Ref<AutosizeTextAreaRef>,
  ) => {
    const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

    const adjustHeight = useAutosizeTextArea({
      textAreaRef,
      maxHeight,
      minHeight,
    });

    useImperativeHandle(ref, () => ({
      textArea: textAreaRef.current as HTMLTextAreaElement,
      focus: () => textAreaRef.current?.focus(),
      maxHeight,
      minHeight,
    }));

    const handleChange = React.useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e);
        adjustHeight();
      },
      [onChange, adjustHeight],
    );

    React.useEffect(() => {
      adjustHeight();
    }, [adjustHeight]);

    return (
      <textarea
        {...props}
        value={value}
        ref={textAreaRef}
        className={cn(
          'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        onChange={handleChange}
      />
    );
  },
);

AutosizeTextarea.displayName = 'AutosizeTextarea';
