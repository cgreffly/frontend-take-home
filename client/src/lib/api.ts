import type {
  User,
  AddUserPayload,
  Role,
  AddRolePayload,
  PagedData,
} from '../types'

const API_BASE = import.meta.env.VITE_API_BASE

// reusable function for API requests
async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(text || `${res.status}: ${res.statusText}`)
  }

  const contentType = res.headers.get('content-type') ?? ''

  if (contentType.includes('application/json')) {
    return res.json() as Promise<T>
  }

  // in case of no content
  return undefined as T
}

// helper function to convert query parameters to a URL search string
function queryString(
  params: Record<string, string | number | boolean | undefined>
) {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined)
  return entries.length
    ? '?' +
        new URLSearchParams(entries.map(([k, v]) => [k, String(v)])).toString()
    : ''
}

export function getUsers(params?: { page?: number; search?: string }) {
  return request<PagedData<User>>(`/users${queryString(params ?? {})}`)
}

export function addUser(payload: AddUserPayload) {
  return request<User>('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function deleteUser(id: string) {
  return request<User>(`/users/${id}`, { method: 'DELETE' })
}

export function getRoles(params?: { page?: number; search?: string }) {
  return request<PagedData<Role>>(`/roles${queryString(params ?? {})}`)
}

export function addRole(payload: AddRolePayload) {
  return request<Role>('/roles', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function renameRole(id: string, name: string) {
  return request<Role>(`/roles/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ name }),
  })
}
