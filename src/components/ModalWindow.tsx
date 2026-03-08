import { IoMdClose } from "react-icons/io";


interface Props {
    isOpen: boolean,
    close: () => void,
    children?: React.ReactNode
}

export default function ModalWindow(props: Props) {


    return <div className={`z-50 fixed top-0 left-0 w-full h-full bg-main/20 backdrop-blur-sm flex justify-center items-center ${props.isOpen ? 'block' : 'hidden'}`}>
        <div className='bg-light p-2 md:p-5 rounded-md relative max-w-150 w-11/12 shadow-md'>

            <IoMdClose
                className='cursor-pointer text-3xl text-main hover:scale-95 active:scale-90 absolute top-2 right-2'
                title='Zamknij'
                onClick={props.close}
            />

            <div className="w-full">
                {props.children}
            </div>
        </div>
    </div>
}