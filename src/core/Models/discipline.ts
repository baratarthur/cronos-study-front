import { Category } from "./category"

export interface Discipline {
    id: string
    name: string

    categories: Category[]
}