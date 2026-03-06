import { useEffect, useState } from "react";
import type { FF } from "../models";
import QuestionItemContainer from "./QuestionItemContainer";


interface Props {
    data: FF.Question,
    removeQuestion: () => void
}

export default function FamilyFeudQuestionItem({ data, removeQuestion }: Props) {
    const [isValid, setIsValid] = useState(true)

    useEffect(() => {
        if (!('answers' in data)) {
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
            {data.answers?.map((a, i) => <span key={i} className='font-semibold'>
                {a.name}({a.score})
                {i < data.answers.length - 1 ? ', ' : ''}
            </span>)}
        </p>
    </QuestionItemContainer>
}
