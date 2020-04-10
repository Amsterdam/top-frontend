import React, { FC } from "react"
import { Checkbox } from "@datapunt/asc-ui"

type Props = {
  projects: Projects
  state: Projects
  setState: SetState
  className?: ClassName
}
const ProjectsCheckboxes: FC<Props> = ({ projects, state, setState, className }) => {
  const onChange = (project: Project) => (event: ChangeEventInput) => {
    const add = () => setState(state.concat(project))
    const remove = () => setState(state.filter(item => item !== project))
    event.target.checked ? add() : remove()
  }

  return (
    <div className={ className }>
    { projects.map(project => {
        const checked = state.includes(project)
        return (
          <div key={ project }>
            <Checkbox id={ project } checked={ checked } onChange={ onChange(project) } />
            <label htmlFor={ project }>{ project }</label>
          </div>
        )
      })
    }
    </div>
  )
}
export default ProjectsCheckboxes
