import React, {MouseEvent} from 'react'
import IconButton from "../../global/IconButton"
import {ActionButtonsComponentProps} from "../../search/SearchResults"

export type OnAddStartAddress = (caseId:CaseId)=>void

const createActionButtons = (onAddStartAddress:OnAddStartAddress):React.FC<ActionButtonsComponentProps> =>
  ({caseId}) => {

    const onClick = (event:MouseEvent) => {
      event.preventDefault()
      onAddStartAddress(caseId)
    }

    return (<IconButton icon='Enlarge' onClick={onClick} />)
}

export default createActionButtons
