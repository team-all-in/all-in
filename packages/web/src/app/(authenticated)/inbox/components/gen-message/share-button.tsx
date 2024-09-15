import { Copy, Share } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';

interface ShareButtonProps {
  shareData: ShareData;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ shareData }) => {
  const [shareButtonText, setShareButtonText] = useState<string>('シェアする');
  const [copyButtonText, setCopyButtonText] = useState<string>('コピーする');

  const isShareSupported =
    typeof navigator !== 'undefined' && 'canShare' in navigator && navigator.canShare(shareData);

  const isCopySupported = typeof navigator !== 'undefined' && 'clipboard' in navigator;

  const share = async () => {
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share(shareData);
        setShareButtonText('シェアしました！');
        setTimeout(() => setShareButtonText('シェアする'), 2000);
      } catch (error) {
        console.error('シェア中にエラーが発生しました', error);
        setShareButtonText('シェアに失敗しました');
        setTimeout(() => setShareButtonText('シェアする'), 2000);
      }
    }
  };

  const copy = async () => {
    if (typeof navigator !== 'undefined' && 'clipboard' in navigator) {
      try {
        await navigator.clipboard.writeText(shareData.text || '');
        setCopyButtonText('コピーしました！');
        setTimeout(() => setCopyButtonText('コピーする'), 2000);
      } catch (_error) {
        setCopyButtonText('コピーに失敗しました');
        setTimeout(() => setCopyButtonText('コピーする'), 2000);
      }
    }
  };

  return (
    <div className='flex space-x-2'>
      <Button onClick={share} disabled={!isShareSupported} type='button'>
        <Share size={16} className='mr-1' />
        {shareButtonText}
      </Button>
      <Button onClick={copy} disabled={!isCopySupported} type='button' variant='outline'>
        <Copy size={16} className='mr-1' />
        {copyButtonText}
      </Button>
    </div>
  );
};
