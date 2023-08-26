/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import { useFoodAdd } from '../../../hooks/useFoodData'
import { FoodData } from '../../../interfaces/FoodData'
import './FormFood.css'


const Input = ({label, value, updateValue }: InputProps) => {
    return (
        <>
            <label className="label-style" >{label}</label>
            <input className="input-style" value={value} onChange={e => updateValue(e.target.value)}></input>
        </>
    )
}

interface InputProps {
    label: string,
    value: string | number,
    updateValue: (value: any) => void
}

interface ModalProps {
    closeModal(): void
}



export function FormFood({ closeModal }: ModalProps) {
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const { mutate, isSuccess, isLoading } = useFoodAdd()

    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [closeModal, isSuccess])



    const onSubmit = () => {
        const data: FoodData = {
            title,
            price,
            image
        }

        mutate(data)
    }

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastrar um novo item no cardápio</h2>
                <form className="input-container">
                    <Input label='Nome' value={title} updateValue={setTitle}/>
                    <Input label='Preço' value={price} updateValue={setPrice}/>
                    <Input label='Imagem' value={image} updateValue={setImage}/>
                </form>
                <button	onClick={onSubmit} className="btn-secondary">
                    {isLoading ? 'Adicionando...' : 'Adicionar'}
                </button>
            </div>
        </div>
    )
}