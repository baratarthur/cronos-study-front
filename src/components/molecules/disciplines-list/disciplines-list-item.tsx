import { PropsWithChildren, useState } from "react"
import "./disciplines-list-item.css"
import { Discipline } from "@/core/Models/discipline"
import { ListItem } from "@/components/atoms/list-item/list-item"

interface Props extends PropsWithChildren {
    discipline: Discipline
    addDiscipline: (d: Discipline) => void
}

export function DisciplineListItem({discipline, children, addDiscipline}: Props) {
    const [collapseChild, setCollapseChild] = useState<boolean>(false)

    const toggleCollapse = () => {
        setCollapseChild(!collapseChild)
    }

    return (
        <ListItem>
            <div className='discipline-info'>
                <span className='discipline-name'>{discipline.name}</span>
                <div className="discipline-actions">
                    <button onClick={() => addDiscipline(discipline)}>+</button>
                    <button onClick={toggleCollapse}>
                        {collapseChild? <>&uarr;</> : <>&darr;</>}
                    </button>
                </div>
            </div>
            <div style={{overflow: 'hidden', height: collapseChild? 'fit-content' : 0}}>
                {children}
            </div>
        </ListItem>
    )
}
