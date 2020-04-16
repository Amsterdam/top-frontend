import React, { FC } from "react"
import { Select } from "@datapunt/asc-ui"
import useGlobalState from "../../hooks/useGlobalState"
import noop from "../../lib/utils/noop"

type Props = {
  selected?: Stadium
  onChange?: OnChangeHandler
  multiple?: boolean
}

const StadiaSelect: FC<Props> = ({ selected, onChange = noop }) => {
  const {
    planningSettings: {
      data: {
        stadia = undefined
      } = {}
    }
  } = useGlobalState()

  const hasStadia = stadia !== undefined
  const disabled = !hasStadia
  const showStadia = hasStadia

  return (
    <Select value={ selected } disabled={ disabled } onChange={ onChange }>
      <option value="">Geen</option>
      { showStadia &&
        stadia!.map(stadium =>
        <option key={ stadium } value={ stadium }>{ stadium }</option>
        )
      }
    </Select>
  )
}
export default StadiaSelect
