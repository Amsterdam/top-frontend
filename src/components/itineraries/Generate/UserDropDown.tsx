import React, { useMemo } from "react"
import SelectField from "../../form-components/SelectField"
import { isRequired } from "../../form-components/validators/isRequired"

type Props = {
  name: string
  value: string
  users: User[]
  excludedUsers: Array<undefined|null|string>
}

const UserDropdown: React.FC<Props> = ({ name, value, users, excludedUsers }) => {
  const options = useMemo(() => users
    .filter(user => !excludedUsers.includes(user.id) || user.id === value)
    .reduce((acc, user) => ({ ...acc, [user.id]: user.full_name }), {
      "": "-"
    }), [users, excludedUsers, value])

  return (
    <SelectField name={name} options={options} validate={isRequired} />
  )
}

export default UserDropdown
