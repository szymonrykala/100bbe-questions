import { useState } from "react"
import type { OOT } from "../models"

interface Props {
    addQuestion: (question: OOT.Question) => void
}

const defaultQuestionValue = {
    id: '',
    question: '',
    answer: ''
}

export default function AddOOTQuestionForm({ addQuestion }: Props) {
    const [question, setQuestion] = useState<OOT.Question>({ ...defaultQuestionValue })
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        if (question.question.trim() === '' || question.answer.trim() === '') {
            setError("Podaj odpowiedź oraz pytanie")
            return
        }

        question.id = crypto.randomUUID()

        console.debug('Adding question', question)
        addQuestion(question)
        setQuestion(defaultQuestionValue)
        setError(null)
    }

    const setValue = (name: string) => {
        return (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setQuestion(prev => ({
                ...prev,
                [name]: event.target.value
            }))
        }
    }

    return <form className="flex flex-col gap-3 p-2 rounded-md" onSubmit={handleSubmit}>

        <div className="question-long-input">
            <label htmlFor="question">Pytanie:</label>
            <textarea
                name="question"
                id="question"
                placeholder="treść pytania"
                onChange={setValue('question')}
                value={question.question}
            ></textarea>
        </div>

        <div className="question-long-input">
            <label htmlFor="answer">Odpowiedź:</label>
            <textarea
                name="answer"
                id="answer"
                placeholder="odpowiedź"
                onChange={setValue('answer')}
                value={question.answer}
            ></textarea>
        </div>

        {
            error && <p className="text-accent text-sm">{error}</p>
        }

        <button className="button max-w-fit self-center" type="submit">Dodaj pytanie</button>
    </form>
}