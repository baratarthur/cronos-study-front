import { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Modal from "react-modal";

import { List } from "@/components/atoms/list/list";
import { AddCategoryModal } from "@/components/molecules/add-category-modal/add-category-modal";

import { api } from "@/core/api";
import { Discipline } from "@/core/Models/discipline";
import { useModal } from "@/core/hooks/use-modal";

import { CategoryList } from "../category-list/category-list";

import "./disciplines-list.css"
import { DisciplineListItem } from "./disciplines-list-item";

interface DisciplinesResponse {
    disciplines: Discipline[]
}  

Modal.setAppElement('#modal')

export function DisciplinesList() {
    const { isLoading, error, data, refetch } = useQuery('disciplinesData', () =>
        api.get<DisciplinesResponse>('/discipline').then(r => r.data.disciplines)
    )  
    const {modalIsOpen, openModal, closeModal} = useModal()

    const [disciplineSelected, setDisciplineSelected] = useState<Discipline>()

    const handleClick = (discipline: Discipline) => {
        setDisciplineSelected(discipline)
        openModal()
    }

    const addCategory = (categoryName: string) => {
        if(!categoryName.length || !disciplineSelected) return

        const body = {
            name: categoryName,
            disciplineId: disciplineSelected?.id
        }

        api.post('/category', body).then(() => {
            closeModal()
            toast.success('Categoria adicionada com sucesso')
            refetch()
        }).catch((error) => {
            toast.error(error.message)
        })
    }

    if(isLoading) return <p>Loading...</p>
    if(error) return <p>error on load disciplines</p>

    return (
        <section className="disciplines-list">
            <List>
                {data?.map(discipline => (
                    <DisciplineListItem key={discipline.id}
                        discipline={discipline}
                        addDiscipline={handleClick}>
                        <CategoryList data={discipline.categories} refresh={refetch}/>
                    </DisciplineListItem>
                ))}
            </List>
            <AddCategoryModal modalIsOpen={modalIsOpen}
                disciplineSelected={disciplineSelected}
                handleSubmit={addCategory}
                closeModal={closeModal}/>
        </section>
    )
}
