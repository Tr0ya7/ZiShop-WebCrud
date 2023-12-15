import { IoAdd } from "react-icons/io5"

interface Props {
    addOnClick: () => void
}

export default function Header({ addOnClick }: Props) {
    return (
        <header className="py-5 flex justify-end">
            <IoAdd className="w-5 cursor-pointer" color="#9fafc5" onClick={ addOnClick } />
        </header>
    )
}