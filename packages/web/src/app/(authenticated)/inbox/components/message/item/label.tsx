import type { NextPage } from 'next';
import { Badge } from '~/components/ui/badge';
import { LabelsProps, defaultLabelsProps } from './label-type';

type Props = {
  priority: 1 | 2 | 3 | 4 | 5;
};

const Label: NextPage<Props> = ({ priority }) => {
  const labelState = LabelsProps[priority] || defaultLabelsProps;

  return (
    <Badge
      variant='outline'
      className='h-fit bg-white'
      style={{
        borderColor: labelState.color,
        color: labelState.color,
      }}
    >
      {labelState.text}
    </Badge>
  );
};

export default Label;
