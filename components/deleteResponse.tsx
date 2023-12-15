import Button from "./button"

interface Product {
    ID: number
    NAME: string
    DESCRIPTION: string
    PRICE: number
    IMAGE_NAME: string
}

interface Props {
    data: Product[]
    className: string
    children: string
    yesOnClick: (arg: number | null) => void
    noOnClick: () => void
}

export default function DeleteResponse({ data, className, children, yesOnClick, noOnClick }: Props) {
    return (
        <>
            <div className={`text-white flex justify-center items-center z-10 ${ className }`}>
                { data.map((product) => (
                    <div
                        key={product.ID}
                        className="
                            w-72 border border-[#bb4366] bg-[#0f172a] text-base p-8 z-10 text-center
                        "
                    >
                        Tem certeza que deseja excluir o item { children }?
                        <section className="mt-5">
                            <Button className="mr-5" onClick={ () => yesOnClick(product.ID) }>
                                Sim
                            </Button>
                            <Button className="" onClick={ noOnClick }>
                                Não
                            </Button>
                        </section>
                    </div>
                )) }
            </div>
        </>
    )
}