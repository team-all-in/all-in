import { NextPage } from "next"
import { LabelsProps, LabelType } from "./label-type"

type Props = {
  labelType: LabelType
}

const Label: NextPage<Props> = ({ labelType }) => {
  const labelState = LabelsProps[labelType]

  return (
    <div className={ 'py-1 px-4 h-fit w-fit bg-white bg-opacity-40 border-2 rounded-full ' + labelState.class}>
      {labelState.text}
    </div>
  )
}



export default Label