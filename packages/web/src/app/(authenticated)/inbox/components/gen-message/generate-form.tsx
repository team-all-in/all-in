'use client';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import Image from 'next/image';
import { useActionState } from 'react';
import { z } from 'zod';
import { AutosizeTextarea } from '~/components/ui/autosize-textarea';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { generateMessageAction } from '../../actions/generateMessage';
import loadingSrc from './assets/loading.gif';
import { ShareButton } from './share-button';
import { StyleRadio } from './style-radio';

export const formSchema = z.object({
  message: z.string({ required_error: 'メッセージは必須です' }),
  style: z.enum(['simple', 'formal', 'casual', 'long', 'oji', 'oba'], {
    required_error: 'スタイルを選択してください',
  }),
});

export default function GenerateForm({ message }: { message: string }) {
  const [state, formAction, isPending] = useActionState(generateMessageAction, '');

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formSchema });
    },
    defaultValue: { message, style: 'simple' },
    shouldValidate: 'onBlur',
  });

  return (
    <div className='relative'>
      {isPending && (
        <div className='absolute inset-0 z-40 grid place-content-center rounded-md bg-white'>
          <Image src={loadingSrc} alt='Loading' width={120} height={120} />
        </div>
      )}
      {!state ? (
        <form {...getFormProps(form)} action={formAction} className='space-y-3'>
          <Input {...getInputProps(fields.message, { type: 'hidden' })} value={message} />
          <Label htmlFor={fields.style.id}>スタイルを選択してください</Label>
          <StyleRadio
            meta={fields.style}
            items={[
              { value: 'simple', label: 'シンプル' },
              { value: 'formal', label: 'フォーマル' },
              { value: 'casual', label: 'カジュアル' },
              { value: 'long', label: '長文' },
              { value: 'oji', label: 'おじさん構文' },
              { value: 'oba', label: 'おばさん構文' },
            ]}
          />
          <Button type='submit' className='w-full' size='lg'>
            生成する
          </Button>
        </form>
      ) : (
        <div className='space-y-3'>
          <AutosizeTextarea value={state} readOnly className='resize-none' maxHeight={300} />
          <ShareButton
            shareData={{
              text: state,
            }}
          />
        </div>
      )}
    </div>
  );
}
