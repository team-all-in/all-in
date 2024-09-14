
type LabelProps = {
  class: string,
  text: string
}

const LabelsProps: Record<string, LabelProps> = {
  high: {
    class: "border-red-500 text-red-500",
    text: "High"
  },
  medium: {
    class: "border-yellow-500 text-yellow-500",
    text: "Medium"
  },
  low: {
    class: "border-blue-500 text-blue-500",
    text: "Low"
  }
}

const defaultLabelsProps: LabelProps = {
    class: "border-red-500 text-red-500",
    text: "High"
};

export { LabelsProps, defaultLabelsProps }
export type { LabelProps }
