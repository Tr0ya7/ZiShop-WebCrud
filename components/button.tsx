import React from 'react'

interface Props {
    className: string
    children: string
    onClick: () => void
}

export default function Button({ className, children, onClick }: Props) {
    return (
        <button 
            className={`
                bg-[#0f172a] border border-[#bb4366] rounded-md px-4 text-white transition text-[.6rem]
                ${ className }
                hover:bg-[#8c9aaf] hover:text-black
            `}
            onClick={ onClick }
        >
            { children }
        </button>
    )
}