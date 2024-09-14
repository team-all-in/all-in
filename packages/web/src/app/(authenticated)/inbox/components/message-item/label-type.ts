enum LabelType {
  High,
  Middle,
  Row
}

type LabelProps = {
  class: string,
  text: string
}

const LabelsProps: Record<LabelType, LabelProps> = {
  [LabelType.High]: {
    class: "border-red-500 text-red-500",
    text: "High"
  },
  [LabelType.Middle]: {
    class: "border-yellow-500 text-yellow-500",
    text: "Middle"
  },
  [LabelType.Row]: {
    class: "border-blue-500 text-blue-500",
    text: "Row"
  }
}



export {
  LabelType, LabelsProps
}
export type { LabelProps }
