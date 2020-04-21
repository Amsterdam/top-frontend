import React from 'react'
import {isRequired} from "../form-components/validators/isRequired"
import CheckboxField from "../form-components/CheckboxField"
import {Label} from "@datapunt/asc-ui"

type Props = {
  projects: string[]
}

const ProjectCheckboxes: React.FC<Props> = ({projects}) => <>
  { projects.map(project => (
    <div key={project}>
      <Label label={project}>
        <CheckboxField
          name='projects'
          value={project}
          validate={isRequired}
        />
      </Label>
      </div>
  )) }
</>

export default React.memo(ProjectCheckboxes)
