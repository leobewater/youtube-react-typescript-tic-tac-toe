import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

function Square({ children }: Props) {
    return (
        <div className="h-36 border-solid border-4 border-slate-200 font-display text-7xl text-center flex justify-center items-center cursor-pointer">
            {children}
        </div>
    )
}

export default Square