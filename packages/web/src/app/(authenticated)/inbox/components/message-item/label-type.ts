type LabelProps = {
  color: string;
  text: string;
};

const LabelsProps: Record<number, LabelProps> = {
  1: {
    color: '#22c55e',
    text: 'Row',
  },
  2: {
    color: '#3b82f6',
    text: 'Medium',
  },
  3: {
    color: '#eab308',
    text: 'High',
  },
  4: {
    color: '#f97316',
    text: 'Urgent',
  },
  5: {
    color: '#ef4444',
    text: 'Critical',
  },
};

const defaultLabelsProps: LabelProps = {
  color: 'yellow-500',
  text: 'High',
};

export { LabelsProps, defaultLabelsProps };
export type { LabelProps };
