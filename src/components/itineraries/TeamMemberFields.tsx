import {Field} from "react-final-form"
import UserDropdown from "./Generate/UserDropDown"
import React from "react"
import styled from "styled-components"

const Div = styled.div`
  padding-bottom: 12px;
  border-bottom: 1px solid #B4B4B4;
  margin-bottom: 12px;
`

const Label = styled.label`
  font-weight: bold;
`

const USER_DROPDOWNS = [
  'Toezichthouder 1',
  'Toezichthouder 2',
  'Handhaver',
]

type Props = {
  users: User[]
  alreadySelectedUserIds: Array<undefined|null|string>
}

const TeamMemberFields:React.FC<Props> = ({users, alreadySelectedUserIds}) => <>
    { USER_DROPDOWNS.map((label, index) => (
      <Div key={index}>
        <Label>{label}</Label>
        <Field name={`users[${index}]`}>
          {({input: {onChange, value}}) => (
            <UserDropdown users={users}
                          onChange={onChange}
                          value={value}
                          excludedUsers={alreadySelectedUserIds}
            />)}
        </Field>
      </Div>
    ))}
 </>

export default TeamMemberFields
