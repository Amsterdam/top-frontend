import React, { FC } from "react"
//import { Select } from "@datapunt/asc-ui"
import useGlobalState from "../../hooks/useGlobalState"
import noop from "../../lib/utils/noop"

type Props = {
  selected?: Stadia
  onChange?: OnChangeHandler
  multiple?: boolean
}

const StadiaSelect: FC<Props> = ({ selected = [], onChange = noop, multiple = false }) => {
  const {
    planningSettings: {
      data: {
        stadia = undefined
      } = {}
    }
  } = useGlobalState()

  const value = multiple ? selected : (selected[0] || "")
  const showEmpty = !multiple
  const hasStadia = stadia !== undefined
  const disabled = !hasStadia
  const showStadia = hasStadia

  return (
    <select value={ value } disabled={ disabled } onChange={ onChange } multiple={ multiple }>
      { showEmpty &&
        <option value="">-</option>
      }
      { showStadia &&
        stadia!.map(stadium =>
        <option key={ stadium } value={ stadium }>{ stadium }</option>
        )
      }
    </select>
  )
}
export default StadiaSelect
