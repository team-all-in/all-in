import { NextPage } from "next"
import { defaultLabelsProps, LabelsProps } from "./label-type"

type Props = {
  priority: string
}

const Label: NextPage<Props> = ({ priority }) => {
  const labelState = LabelsProps[priority] || defaultLabelsProps

  return (
    <div className={ 'py-1 px-4 h-fit w-fit bg-white bg-opacity-40 border-2 rounded-full ' + labelState.class}>
      {labelState.text}
    </div>
  )
}



export default Label