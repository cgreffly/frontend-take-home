export type Role = {
  id: string
  name: string
  description: string
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export type AddRolePayload = {
  name: string
  description?: string
  isDefault?: boolean
}
