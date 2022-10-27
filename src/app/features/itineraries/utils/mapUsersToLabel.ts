
type User = Components.Schemas.User & {
  label: string
}

const mapUsersToLabel = (users: Components.Schemas.User[]) => {
  const userList: User[] = []
  users.forEach((user: any) => {
    const { last_name, first_name, full_name } = user
    const newUser = { ...user }
    newUser.label = last_name ? `${ last_name }, ${ first_name }` : full_name
    userList.push(newUser)
  })
  const sortedUserList = userList.sort((a: User, b: User) => a.label.localeCompare(b.label))
  return sortedUserList
}

export default mapUsersToLabel
