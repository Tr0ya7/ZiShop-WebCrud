import { MdClose } from "react-icons/md"
import Button from "./button"
import Input from "./input"
import { ChangeEvent, useEffect, useState } from 'react'

interface Props {
    className: string
    addProductOnSubmit: (event: Event) => void
    closeOnClick: () => void
    dataValues: Function
}

export default function AddProduct({ className, addProductOnSubmit, closeOnClick, dataValues }: Props) {
    const [imageFile, setImageFile] = useState('')
    const [imageName, setImageName] = useState('')
    const [productName, setProductName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState<number>(0)

    function handleFileChange(event: any) {
        const file = event.target.files[0]
        if (file) {
            setImageFile(file)    
            setImageName(file.name)
        }
    }
    
    useEffect(() => {
        dataValues({imageFile, imageName, productName, description, price})
    }, [imageFile, imageName, productName, description, price])

    return (
        <form 
            className={`text-white flex justify-center items-center z-10 ${ className }`} name="datas"
            onSubmit={ () => addProductOnSubmit }
        >
            <div
                className={`
                    w-72 border border-[#bb4366] bg-[#243253] text-base p-8 relative ${ className }
                `}
            >
                <MdClose className="absolute top-1 right-1 cursor-pointer" onClick={ closeOnClick } />
                <section className="my-0.5">
                    <div className="text-center mb-5">
                        <label 
                            className="
                                border rounded-md border-dashed p-5 relative 
                                hover:border-[#bb4366] hover:text-[#bb4366]
                            "
                        >
                            <input className="absolute w-full hidden" type="file" onChange={handleFileChange} />
                            Foto
                        </label>
                    </div>
                    Nome
                    <Input 
                        type="" 
                        value={productName} 
                        inputOnChange={(event) => setProductName(event.target.value)} 
                    />
                    <section className="my-2">
                        Descrição
                        <textarea 
                            className="input" 
                            value={description} 
                            onChange={(event) => setDescription(event.target.value)} 
                            required 
                        />
                    </section>
                    Preço
                    <Input type="number" value={price} inputOnChange={(event) => setPrice(event.target.value)} /> {/*adicionar o tipo de valor de moeda*/}
                </section>
                <div className="w-full text-center">
                    <Button className="bg-[#37425f] p-1 mt-5" onClick={() => null}>
                        Adicionar
                    </Button>
                </div>
            </div>
        </form>
    )
}