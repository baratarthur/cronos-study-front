import { Topic } from "./topic"

export interface Category {
    id: string
    name: string

    topics?: Topic[]
}