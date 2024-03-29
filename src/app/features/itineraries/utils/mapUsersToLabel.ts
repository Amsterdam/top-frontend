
type User = Components.Schemas.User & {
  label?: string
}

export const createUserWithLabel = (user: Components.Schemas.User) => {
  const { first_name, last_name, full_name } = user
  const newUser: User = { ...user }
  let label = full_name
  if (first_name && last_name) {
    // full_name has no dot in name.
    if (full_name.indexOf(".") === -1) {
      label = `${ first_name } ${ last_name }`
    }
    // full_name has dots so replace initials by firstname.
    if (full_name.charAt(1) === "." && full_name.charAt(0) === first_name.charAt(0)) {
      const initials = full_name.substring(0, full_name.lastIndexOf(".") + 1)
      label = full_name.replace(initials, first_name)
    }
  }
  // Remove space at the beginning of the label
  if (label.charAt(0) === " ") {
    label = label.slice(1)
  }
  newUser.label = label
  return newUser
}

const mapUsersToLabel = (users: Components.Schemas.User[]) => {
  const userList: User[] = users.map((user: any) => createUserWithLabel(user))
  const newUserList = userList.sort((a: User, b: User) => {
    if (a.label && b.label) {
      return a.label.localeCompare(b.label)
    }
    return -1
  } )
  return newUserList
}

export default mapUsersToLabel
