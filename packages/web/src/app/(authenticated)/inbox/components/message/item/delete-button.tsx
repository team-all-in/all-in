import { getFormProps, getInputProps, useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { Loader2, Trash } from 'lucide-react';
import { useActionState } from 'react';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { deleteMessageAction } from '../../../actions/deleteMessage';

export const formSchema = z.object({
  id: z.string(),
});

export default function DeleteButton({ id }: { id: string }) {
  const [_, formAction, isPending] = useActionState(deleteMessageAction, '');

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
      <Button variant='destructive' type='submit' size='sm' disabled={isPending}>
        {isPending ? <Loader2 className='animate-spin' size={18} /> : <Trash size={18} />}
      </Button>
    </form>
  );
}
