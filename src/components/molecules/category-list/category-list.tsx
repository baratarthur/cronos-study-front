import { ListItem } from "@/components/atoms/list-item/list-item";
import { List } from "@/components/atoms/list/list";
import { Category } from "@/core/Models/category";

import './category-list.css'
import { useState } from "react";
import { useModal } from "@/core/hooks/use-modal";
import { AddTopicModal } from "../add-topic-modal/add-topic-modal";
import { api } from "@/core/api";
import { toast } from "react-toastify";

interface Props {
    data: Category[],
    refresh: () => void
}

export function CategoryList({data, refresh}: Props) {
    const [categorySelected, setCategorySelected] = useState<Category>()
    const {modalIsOpen, openModal, closeModal} = useModal()

    const handleClick = (category: Category) => {
        setCategorySelected(category)
        openModal()
    }

    const addTopicToday = (topicName: string) => {
        if(!topicName.length || !categorySelected) return

        const body = {
            name: topicName,
            categoryId: categorySelected?.id
        }

        api.post('/topic', body).then(() => {
            closeModal()
            toast.success('Categoria adicionada com sucesso')
            refresh()
        }).catch((error) => {
            toast.error(error.message)
        })
    }

    const deleteCategory = (categoryId: string) => {
        api.delete(`/category/${categoryId}`).then(() => {
            toast.warning('Categoria adicionada com sucesso')
            refresh()
        }).catch((error) => {
            toast.error(error.message)
        })
    }

    if (!data.length) return null
    
    return (
        <>
            <List style={{
                marginTop: '.5rem',
                paddingLeft: '1.5rem',
                overflow: 'hidden',
            }}>
                {data.map(c => (
                    <ListItem key={c.id}>
                        <div className='category-info'>
                            <span className='category-title'>{c.name}</span>
                            <div className="actions">
                                <button onClick={() => handleClick(c)}>+</button>
                                <button onClick={() => deleteCategory(c.id)}>
                                    deletar
                                </button>
                            </div>
                        </div>
                    </ListItem>
                ))}
            </List>
            <AddTopicModal modalIsOpen={modalIsOpen}
                categorySelected={categorySelected}
                handleSubmit={addTopicToday}
                closeModal={closeModal}/>
        </>
    )
}
