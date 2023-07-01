import { CSSProperties, ReactNode } from "react"
import './list.css'


interface Props {
    style?: CSSProperties
    children: ReactNode
}

export function List({ children, style }: Props) {
    return (
        <ul className="common-list"
            style={style}>
            {children}
        </ul>
    )
}
