import { ChangeEvent } from 'react'

interface Props {
    value: any
    inputOnChange: (event: ChangeEvent<HTMLInputElement>) => void
    type: string
}

export default function Input({ value, inputOnChange, type = "text" }: Props) {
    return <input className="input" type={ type } value={ value } onChange={ inputOnChange } required />
}