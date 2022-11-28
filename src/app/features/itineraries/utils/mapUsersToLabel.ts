
type User = Components.Schemas.User & {
  label?: string
}

export const createUserWithLabel = (user: Components.Schemas.User) => {
  const { last_name, first_name, full_name } = user
  const newUser: User = { ...user }
  newUser.label = first_name && last_name ? `${ first_name } ${ last_name }` : full_name
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
