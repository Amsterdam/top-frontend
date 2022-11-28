
type User = Components.Schemas.User & {
  label: string
}

const mapUsersToLabel = (users: Components.Schemas.User[]) => {
  const userList: User[] = users.map((user: any) => {
    const { last_name, first_name, full_name } = user
    const newUser: User = { ...user }
    newUser.label = first_name && last_name ? `${ first_name } ${ last_name }` : full_name
    return newUser
})
  return userList.sort((a: User, b: User) => a.label.localeCompare(b.label))
}

export default mapUsersToLabel
