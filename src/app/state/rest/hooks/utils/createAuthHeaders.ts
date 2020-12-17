const createAuthHeaders = (token: string) => ({ Authorization: `Bearer ${ token }` })

export default createAuthHeaders
