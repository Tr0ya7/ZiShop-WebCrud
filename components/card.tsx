import Image from "next/image"
import { MdOutlineDeleteForever } from "react-icons/md"
import { IoIosHeartEmpty, IoMdHeart } from "react-icons/io"

interface Product {
    ID: number
    NAME: string
    DESCRIPTION: string
    PRICE: number
    IMAGE_NAME: string
}

interface Props {
    data: Product[]
    onClick: (arg: number, arg1: string) => void
}

export default function Card({ data, onClick }: Props) {
    const isLiked = true

    return (
        <div className="py-4 flex flex-wrap justify-center">
            {data.map((product) => (
                <section key={product.ID} className="flex mb-5">
                    <div 
                        className="
                            p-4 bg-[#94a3b84d] rounded-tl-xl rounded-bl-xl flex w-[50%] items-center relative
                            md:w-40
                        "
                    >
                        <Image 
                            key={product.ID}
                            className="h-fit" 
                            src={`/products/images/${product.IMAGE_NAME}`} 
                            width={150} 
                            height={150} 
                            alt={product.NAME} 
                        />
                        <MdOutlineDeleteForever 
                            className="absolute top-1 left-1 w-5 cursor-pointer" 
                            fill="#9fafc5" 
                            onClick={() => onClick(product.ID, product.NAME)} 
                        />
                    </div>
                    <section className="bg-[#19243b] w-[50%] rounded-tr-xl rounded-br-xl">
                        <section className="flex justify-center items-center">
                            <div className="cursor-pointer mt-1">
                                {isLiked 
                                    ? <IoIosHeartEmpty className="w-6" color="#8c9aaf" /> 
                                    : <IoMdHeart color="red" />
                                }
                            </div>
                        </section>
                        <h3 className="text-[#8c9aaf] text-sm py-1.5 px-px md:px-4 md:py-5">
                            {product.DESCRIPTION}
                        </h3>
                        <div className="text-white text-sm mb-1 text-left ml-3 md:mb-0">
                            {product.PRICE.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                        </div>
                    </section>
                </section>
            ))}
        </div>
    )
}