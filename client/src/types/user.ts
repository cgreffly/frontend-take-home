export type User = {
  id: string
  first: string
  last: string
  roleId: string
  photo: string
  createdAt: string
  updatedAt: string
}

export type AddUserPayload = {
  first: string
  last: string
  roleId: string
}
