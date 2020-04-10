import React, { FC } from "react"
import { Checkbox } from "@datapunt/asc-ui"

type Props = {
  name: string
  stadia: Stadia
  state: Stadia
  setState: SetState
  className?: string
}

const StadiaCheckboxes: FC<Props> = ({ name, stadia, state, setState, className }) => {
  const createOnChangeCheckbox = (value: Stadium, state: Stadia, setState: SetState) => (event: ChangeEventInput) => {
    const add = () => setState(state.concat(value))
    const remove = () => setState(state.filter(item => item !== value))
    event.target.checked ? add() : remove()
  }

  return (
    <div className={ className }>
    { stadia.map(stadium => {
        const id = `${ name }-${ stadium }`
        return (
          <div key={ stadium }>
            <Checkbox id={ id } checked={ state.includes(stadium) } onChange={ createOnChangeCheckbox(stadium, state, setState) } />
            <label htmlFor={ id }>{ stadium }</label>
          </div>
        )
      })
    }
    </div>
  )
}
export default StadiaCheckboxes
