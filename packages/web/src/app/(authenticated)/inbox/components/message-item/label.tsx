import type { NextPage } from 'next';
import { LabelsProps, defaultLabelsProps } from './label-type';
import { Badge } from '~/components/ui/badge';

type Props = {
  priority: 1 | 2 | 3 | 4 | 5
};

const Label: NextPage<Props> = ({ priority }) => {
  const labelState = LabelsProps[priority] || defaultLabelsProps;

  return (
    <Badge
      variant="outline"
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
