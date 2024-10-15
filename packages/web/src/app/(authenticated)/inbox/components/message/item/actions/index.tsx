import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { CircleCheckBig, Sparkles, SquareArrowOutUpRight, Trash2 } from 'lucide-react';
import { useActionState } from 'react';
import { z } from 'zod';
import { markAsReadAction } from '~/app/(authenticated)/inbox/actions/markAsRead';
import { Input } from '~/components/ui/input';
import { Separator } from '~/components/ui/separator';
import { cn } from '~/libs/classes';
import type { Message } from '~/libs/types/message';
import { AppsProps } from '../app-type';
import ActionButton from './action-button';

export const formSchema = z.object({
  id: z.string(),
});

export default function Actions({ app, id, message_link }: { app: Message['app'], id:Message['id'], message_link: Message['message_link'] }) {
  const [_, formAction, isPending] = useActionState(markAsReadAction, '');

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formSchema });
    },
    defaultValue: { id },
    shouldValidate: 'onBlur',
  });
  const appVariant = AppsProps[app];

  return (
    <div
      className={cn(
        '-translate-y-2/3 absolute top-0 right-5 z-30 flex items-center rounded-lg border-2 p-1 px-1.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100',
        appVariant.actionClass,
      )}
    >
      {app === 'github' ? (
        <>
          <form {...getFormProps(form)} action={formAction}>
            <Input {...getInputProps(fields.id, { type: 'hidden' })} value={id} />
            <ActionButton
              Icon={CircleCheckBig}
              text='既読を付ける'
              className='hover:bg-white/10'
              type='submit'
              disabled={isPending}
            />
          </form>
          <ActionButton
            Icon={SquareArrowOutUpRight}
            className='hover:bg-white/10'
            handleClick={() => console.log('read')}
            type='button'
          />
        </>
      ) : (
        <>
          <ActionButton
            Icon={Sparkles}
            text='返信を生成する'
            handleClick={() => console.log('read')}
            type='button'
          />
          <ActionButton
            Icon={SquareArrowOutUpRight}
            className='text-black'
            handleClick={() => console.log('read')}
            type='button'
          />
          <Separator orientation='vertical' className='mx-1 h-5' />
          <ActionButton
            Icon={Trash2}
            className='text-red-500 hover:bg-red-500/15'
            handleClick={() => console.log('read')}
            type='button'
          />
        </>
      )}
    </div>
  );
}
