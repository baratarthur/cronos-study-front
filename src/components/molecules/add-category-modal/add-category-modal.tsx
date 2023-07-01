import { Discipline } from "@/core/Models/discipline";
import { FormEvent, useState } from "react";
import ReactModal from "react-modal";

import './add-category-modal.css'

interface Props {
    modalIsOpen: boolean,
    disciplineSelected?: Discipline
    handleSubmit: (categoryName: string) => void,
    closeModal: () => void
}

export function AddCategoryModal({
    modalIsOpen,
    disciplineSelected,
    handleSubmit,
    closeModal
}: Props) {
    const [categoryName, setCategoryName] = useState<string>('')

    const handleChange = (e: any) => {
        setCategoryName(e.target.value)
    }

    const submit = (e: FormEvent) => {
        e.preventDefault()
        handleSubmit(categoryName.trim())
        setCategoryName('')
    }
    
    return (
        <ReactModal className="modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}>
            <header>
                <h4 className="modal-title">
                    Adicionar categoria a {disciplineSelected?.name}
                </h4>
                <button className="close-button" onClick={closeModal}>X</button>
            </header>
            <form onSubmit={submit}>
                <input type="text" value={categoryName} onChange={handleChange}/>
                <button type="submit">Adicionar</button>
            </form>
        </ReactModal>
    )
}