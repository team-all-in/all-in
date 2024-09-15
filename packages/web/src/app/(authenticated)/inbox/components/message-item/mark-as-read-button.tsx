import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Check, Loader2 } from 'lucide-react';
import { useActionState } from 'react';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { markAsReadAction } from '../../actions/markAsRead';

export const formSchema = z.object({
  id: z.string(),
});

export default function MarkAsReadButton({ id }: { id: string }) {
  const [_, formAction, isPending] = useActionState(markAsReadAction, '');

  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: formSchema });
    },
    defaultValue: { id },
    shouldValidate: 'onBlur',
  });

  return (
    <form {...getFormProps(form)} action={formAction}>
      <Input {...getInputProps(fields.id, { type: 'hidden' })} value={id} />
      <Button variant='secondary' type='submit' size='sm' disabled={isPending}>
        {isPending ? (
          <Loader2 className='mr-2 animate-spin' size={18} />
        ) : (
          <Check className='mr-2' size={18} />
        )}
        <span>既読にする</span>
      </Button>
    </form>
  );
}
