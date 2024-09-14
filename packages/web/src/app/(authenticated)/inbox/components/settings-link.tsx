import { Settings } from 'lucide-react';
import Link from 'next/link';

export default function SettingsLink() {
  return (
    <Link href='/settings' className='fixed top-2 right-3 z-50'>
      <Settings size={24} />
    </Link>
  );
}
