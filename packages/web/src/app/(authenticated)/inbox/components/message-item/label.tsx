import type { NextPage } from 'next';
import { LabelsProps, defaultLabelsProps } from './label-type';

type Props = {
  priority: string;
};

const Label: NextPage<Props> = ({ priority }) => {
  const labelState = LabelsProps[priority] || defaultLabelsProps;

  return (
    <div className={`h-fit w-fit rounded-full border-2 bg-white/60 px-4 py-1 ${labelState.class}`}>
      {labelState.text}
    </div>
  );
};

export default Label;
