import { Category } from '@/core/Models/category'
import './add-topic-modal.css'
import { FormEvent, useState } from 'react'
import ReactModal from 'react-modal'

interface Props {
    modalIsOpen: boolean,
    categorySelected?: Category
    handleSubmit: (topicName: string) => void,
    closeModal: () => void
}

export function AddTopicModal({
    modalIsOpen,
    categorySelected,
    handleSubmit,
    closeModal
}: Props) {
    const [topicName, setTopicName] = useState<string>('')

    const handleChange = (e: any) => {
        setTopicName(e.target.value)
    }

    const submit = (e: FormEvent) => {
        e.preventDefault()
        handleSubmit(topicName.trim())
        setTopicName('')
    }
    
    return (
        <ReactModal className="modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}>
            <header>
                <h4 className="modal-title">
                    Adicionar tópico a {categorySelected?.name}
                </h4>
                <button className="close-button" onClick={closeModal}>X</button>
            </header>
            <form onSubmit={submit}>
                <input type="text" value={topicName} onChange={handleChange}/>
                <button type="submit">Adicionar</button>
            </form>
        </ReactModal>
    )
}