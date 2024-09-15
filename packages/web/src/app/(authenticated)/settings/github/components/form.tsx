'use client';

import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { RefreshCw } from 'lucide-react';
import { useActionState } from 'react';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { GITHUB_TOKEN_REFERENCE } from '~/libs/configs';
import { saveGitHubSettingsAction } from '../actions/save-github-settings';

export const formSchema = z.object({
  token: z.string({
    required_error: '個人用アクセス トークンを入力してください',
  }),
});

export default function GitHubSettingForm() {
  const [_, formAction, isPending] = useActionState(saveGitHubSettingsAction, '');

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formSchema });
    },
    shouldValidate: 'onBlur',
  });

  return (
    <form {...getFormProps(form)} action={formAction} className='max-w-xl space-y-3'>
      <Label>
        個人用アクセス トークン
        <span className='ml-2 text-foreground/70 text-sm'>
          取得方法は
          <a
            href={GITHUB_TOKEN_REFERENCE}
            className='underline underline-offset-2'
            target='_blank'
            rel='noreferrer'
          >
            こちら
          </a>
        </span>
      </Label>
      <Input {...getInputProps(fields.token, { type: 'password' })} autoFocus />
      {fields.token.errors && <p className='text-red-600 text-sm'>{fields.token.errors}</p>}
      <Button type='submit' disabled={isPending}>
        <RefreshCw className={`mr-2 ${isPending && 'animate-spin'}`} size={18} />
        <span>変更する</span>
      </Button>
    </form>
  );
}
