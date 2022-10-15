export interface Todo {
  addedDate: string
  id: string
  order: number
  title: string
}
export type Filter = 'all' | 'active' | 'completed'
