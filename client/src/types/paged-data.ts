export type PagedData<T> = {
  data: T[]
  next: number | null
  prev: number | null
  pages: number
}
