import Button from "./button"

interface Props {
    className: string
    children: string
    yesOnClick: (arg: number | null) => void
    noOnClick: () => void
}

export default function DeleteResponse({ className, children, yesOnClick, noOnClick }: Props) {
    return (
        <div className="absolute inset-y-1/3 start-[5%]">
            <div
                className={`
                    w-72 border border-[#bb4366] bg-[#0f172a] text-white text-base p-8 z-10 text-center 
                    ${ className }
                `}
            >
                Tem certeza que deseja excluir o item { children }?
                <section className="mt-5">
                    <Button className="mr-5" onClick={ () => yesOnClick }>
                        Sim
                    </Button>
                    <Button className="" onClick={ noOnClick }>
                        Não
                    </Button>
                </section>
            </div>
        </div>
    )
}