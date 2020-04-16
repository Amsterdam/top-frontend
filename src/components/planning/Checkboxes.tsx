import React, { FC } from "react"
import { Checkbox } from "@datapunt/asc-ui"

type Option = string
type Options = Option[]
type Props = {
  options: Options
  state: Options
  setState: SetState
  name?: string
  className?: ClassName
}
const Checkboxes: FC<Props> = ({ options, state, setState, name = "", className }) => {
  const onChange = (option: Option) => (event: ChangeEventInput) => {
    const add = () => setState(state.concat(option))
    const remove = () => setState(state.filter(item => item !== option))
    event.target.checked ? add() : remove()
  }

  return (
    <div className={ className }>
    { options.map(option => {
        const id = `${ name ? `${ name }-` : " " }${ option }`
        const checked = state.includes(option)
        return (
          <div key={ option }>
            <Checkbox id={ id } checked={ checked } onChange={ onChange(option) } />
            <label htmlFor={ id }>{ option }</label>
          </div>
        )
      })
    }
    </div>
  )
}
export default Checkboxes
