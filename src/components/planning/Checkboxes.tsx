import React, { FC } from "react"
import { Checkbox } from "@datapunt/asc-ui"

type Option = string
type Options = Option[]
type Props = {
  options: Options
  state: Options
  onChangeHOF: OnChangeHandlerHOF
  name?: string
  className?: ClassName
}
const Checkboxes: FC<Props> = ({ options, state, onChangeHOF, name = "", className }) => (
    <div className={ className }>
    { options.map(option => {
        const id = `${ name ? `${ name }-` : " " }${ option }`
        const checked = state.includes(option)
        return (
          <div key={ option }>
            <Checkbox id={ id } checked={ checked } onChange={ onChangeHOF(option) } />
            <label htmlFor={ id }>{ option }</label>
          </div>
        )
      })
    }
    </div>
  )
export default Checkboxes
