import React from 'react'
import {FormField} from "../form-components/FormComponents"
import styled from "styled-components"

const REASONS = [
  'Bed en breakfast 2019',
  'Burgwallenproject Oudezijde',
  'Corpo-rico',
  'Digital toezicht Safari',
  'Digital toezicht Zebra',
  'Haarlemmerbuurt',
  'Hotline',
  'Mystery Guest',
  'Project Andes',
  'Project Jordaan',
  'Project Lobith',
  'Project Sahara',
  'Safari',
  'Safari 2015',
  'Sahara Adams Suites',
  'Sahara hele woning',
  'Sahara meer dan 4',
  'Sahara Recensies',
  'Sahara veel adv',
  'Social Media 2019',
  'Woonschip (woonboot)',
  'Zebra'
]

// TODO add custom checkboxes
const CheckboxRow = styled.div`
  input {
    margin: 10px;
  }
`

const ReasonCheckboxes: React.FC = () => <>
  { REASONS.map((reason, i) => (
    <CheckboxRow key={reason}>
      <FormField
        id={`projects-${i}`}
        name='projects'
        component='input'
        type='checkbox'
        value={reason}
      />
      <label htmlFor={`projects-${i}`}>
        { reason }
      </label>
    </CheckboxRow>
  )) }
</>

export default React.memo(ReasonCheckboxes)
