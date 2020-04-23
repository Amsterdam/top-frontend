import UserDropdown from "./Generate/UserDropDown"
import React from "react"
import styled from "styled-components"
import { Heading } from "@datapunt/asc-ui"

const Div = styled.div`
  margin-bottom: 24px;
`

const USER_DROPDOWNS = [
  "Toezichthouder 1",
  "Toezichthouder 2",
  "Handhaver"
]

type Props = {
  users: User[]
  alreadySelectedUserIds: Array<undefined|null|string>
}

const TeamMemberFields:React.FC<Props> = ({ users, alreadySelectedUserIds }) => <>
    { USER_DROPDOWNS.map((label, index) => (
      <Div key={index}>
        <Heading forwardedAs="h4">{label}</Heading>
        <UserDropdown
          value={alreadySelectedUserIds[index] ?? ""}
          name={`users[${ index }]`}
          users={users}
          excludedUsers={alreadySelectedUserIds}
        />
      </Div>
    ))}
 </>

export default TeamMemberFields
