'use client';

import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useActionState } from 'react';
import { Button } from '~/components/ui/button';
import { signInWithGoogle } from '~/server/auth/actions';

export default function LoginForm() {
  const [_state, formAction, isPending] = useActionState(signInWithGoogle, null);

  return (
    <form action={formAction}>
      <Button
        className='justify-between gap-1.5 bg-white text-black hover:bg-gray-100 hover:text-black/70'
        variant='outline'
        type='submit'
        disabled={isPending}
      >
        <Image src='/google.png' alt='' width={18} height={18} />
        <span>Googleではじめる</span>
        {isPending && <Loader2 className='animate-spin' size={12} />}
      </Button>
    </form>
  );
}
