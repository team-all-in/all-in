import type { NextPage } from 'next';
import { LabelsProps, defaultLabelsProps } from './label-type';

type Props = {
  priority: 1 | 2 | 3 | 4 | 5;
};

const Label: NextPage<Props> = ({ priority }) => {
  const labelState = LabelsProps[priority] || defaultLabelsProps;

  return (
    <div
      className='h-fit w-fit rounded-full border-4 bg-white px-4 py-1'
      style={{
        borderColor: labelState.color,
        color: labelState.color,
      }}
    >
      {labelState.text}
    </div>
  );
};

export default Label;
