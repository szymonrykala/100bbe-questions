import { useState } from "react"
import type { FF } from "../models"
import { IoAddCircle } from "react-icons/io5"

interface Props {
    addQuestion: (question: FF.Question) => void
}

const defaultQuestionValue: FF.Question = {
    id: '',
    question: '',
    answers: []
}

const defaultAnswerValue = {
    name: '',
    score: 0
}


function AnswerItem({ answer }: { answer: FF.Answer }) {
    return <li>
        <div className="flex justify-between hover:bg-main-50 rounded-md py-2 px-2">
            <span className="">{answer.name}</span>
            <span className="">{answer.score}</span>
        </div>
    </li>
}


export default function AddFFQuestionForm({ addQuestion }: Props) {
    const [question, setQuestion] = useState<FF.Question>({ ...defaultQuestionValue })
    const [answer, setAnswer] = useState<FF.Answer>({ ...defaultAnswerValue })
    const [error, setError] = useState<string | null>(null)


    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        if (question.question.trim() === '') {
            setError("Podaj treść pytania")
            return
        }

        if (question.answers.length < 3) {
            setError("Dodaj minimum 3 odpowiedzi")
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

    const addAnswer = () => {
        if (answer.name.trim() === '' || answer.score <= 0) {
            setError("Podaj odpowiedź i przypisz punkty")
            return
        }

        setQuestion(prev => ({
            ...prev,
            answers: [...prev.answers, answer]
        }))

        setAnswer(defaultAnswerValue)
        setError(null)
        console.debug('Adding answer', answer)
    }

    return <div className="flex flex-col gap-3 p-2 rounded-md">

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

        <ul className="py-2">
            <li>
                <div className="flex justify-between font-semibold">
                    <span>Odpowiedź</span>
                    <span>
                        Punkty
                    </span>
                </div>

            </li>
            {question.answers.map((answer, index) => <AnswerItem key={index} answer={answer} />)}
        </ul>

        <form className="flex gap-2 justify-stretch">

            <div className="small-input grow">
                <label htmlFor="answer-name">Odpowiedź:</label>
                <input
                    type="text"
                    id="answer-name"
                    name="answer-name"
                    className="w-full"
                    value={answer.name}
                    onChange={(e) => setAnswer({ ...answer, name: e.target.value })}
                />
            </div>

            <div className="small-input">
                <label htmlFor="answer-score">Wynik:</label>
                <input
                    type="number"
                    step={1}
                    min={5}
                    max={100}
                    id="answer-score"
                    name="answer-score"
                    className="w-20"
                    value={answer.score}
                    onChange={(e) => setAnswer({ ...answer, score: Number(e.target.value) })}
                />
            </div>
            <div>
                <label htmlFor="add-answer">&nbsp;</label>
                <IoAddCircle
                    id="add-answer"
                    onClick={addAnswer}
                    className="text-4xl text-main active:scale-90 hover:scale-95 cursor-pointer"
                />
            </div>
        </form>
        {
            error && <p className="text-accent text-sm">{error}</p>
        }

        <button className="button max-w-fit self-center" type="submit" onClick={handleSubmit}>Dodaj pytanie</button>
    </div>
}