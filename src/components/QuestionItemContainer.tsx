import { type ReactNode } from "react";
import { TiDelete } from "react-icons/ti";


interface Props {
    isValid: boolean,
    onDelete: () => void,
    children: ReactNode
}

export default function QuestionItemContainer({ isValid, onDelete, children }: Props) {

    return <li className={`flex gap-y-2 p-3 justify-between items-center rounded-sm ${isValid ? 'bg-light hover:bg-main-50' : 'bg-accent/40'}`}>
        <div className="flex flex-col items-start text-left">
            {children}
        </div>

        <TiDelete
            className='text-5xl mr-2 text-dark opacity-30 hover:text-accent hover:opacity-100 cursor-pointer'
            onClick={onDelete}
        />
    </li>
}
