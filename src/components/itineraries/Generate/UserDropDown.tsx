import {Select} from "@datapunt/asc-ui"
import React from "react"

type Props = {
  users: User[]
  excludedUsers: Array<undefined|null|string>
  onChange: (event:any) => void,
  value: string
}

const UserDropdown:React.FC<Props> = ({ onChange, users, value, excludedUsers }) => {
  const filteredUsers =
    users.filter(user => !excludedUsers.includes(user.id) || user.id === value)

  return (
    <Select onChange={onChange} value={value}>
      <option value="">-</option>
      { filteredUsers.map(({ id, full_name }) =>
        <option key={ id } value={ id }>{ full_name }</option>)
      }
    </Select>
  )
}

export default UserDropdown
