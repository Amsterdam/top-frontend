import React, {MouseEvent} from 'react'
import IconButton from "../../global/IconButton"

type Props = {
  caseId: string
}

const ActionButtons:React.FC<Props> = ({ caseId }) => {
  const onClick = (event:MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    alert(caseId)
  }

  return (<IconButton icon='Enlarge' onClick={onClick} />)
}

export default ActionButtons
