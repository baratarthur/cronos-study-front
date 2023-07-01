import { ReactNode } from "react"
import './list-item.css'

interface Props {
    children: ReactNode
}

export function ListItem({ children }: Props) {
    return (
        <li className="common-list__item">
            {children}
        </li>
    )
}
