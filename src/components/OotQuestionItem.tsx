import { useEffect, useState } from "react";
import type { OOT } from "../models";
import QuestionItemContainer from "./QuestionItemContainer";


interface Props {
    data: OOT.Question,
    removeQuestion: () => void
}

export default function OneOfTenQuestionItem({ data, removeQuestion }: Props) {
    const [isValid, setIsValid] = useState(true)


    useEffect(() => {
        if (!('answer' in data)) {
            setIsValid(false)
        }
    }, [data])


    return <QuestionItemContainer isValid={isValid} onDelete={removeQuestion}>
        <p>
            Pytanie:&nbsp;
            <span className='font-semibold'>
                {data.question}
            </span>
        </p>
        <p>
            Odp:&nbsp;
            <span className='font-semibold'>
                {data.answer}
            </span>
        </p>
    </QuestionItemContainer>
}
