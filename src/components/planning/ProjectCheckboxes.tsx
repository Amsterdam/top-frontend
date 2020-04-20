import React from 'react'
import {FormField} from "../form-components/FormComponents"
import styled from "styled-components"
import {isRequired} from "../form-components/validators/isRequired"

// TODO add custom checkboxes
const CheckboxRow = styled.div`
  input {
    margin: 10px;
  }
`

type Props = {
  projects: string[]
}

const ProjectCheckboxes: React.FC<Props> = ({projects}) => <>
  { projects.map(project => (
    <CheckboxRow key={project}>
      <label>
        <FormField
            name='projects'
            component='input'
            type='checkbox'
            value={project}
            validate={isRequired}
          />
        { project }
      </label>
      </CheckboxRow>
  )) }
</>

export default React.memo(ProjectCheckboxes)
