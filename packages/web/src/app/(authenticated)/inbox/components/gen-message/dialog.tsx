'use client';

import { useState } from 'react';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '~/components/ui/drawer';
import { useMediaQuery } from '~/hooks/use-media-query';
import GenerateForm from './generate-form';

export function GenerateMessageDialog({ message }: { message: string }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 640px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>返信メッセージを生成する</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>返信メッセージを生成</DialogTitle>
          </DialogHeader>
          <GenerateForm message={message} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline'>返信メッセージを生成する</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>返信メッセージを生成</DrawerTitle>
        </DrawerHeader>
        <div className='px-3'>
          <GenerateForm message={message} />
        </div>
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>とじる</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
