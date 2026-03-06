import { useEffect, useMemo, useState, type ChangeEvent } from 'react'
import toast from 'react-hot-toast'
import { type FF, type OOT, Game } from './models'
import OneOfTenQuestionItem from './components/OotQuestionItem'
import { IoMdAddCircle } from "react-icons/io";
import AddOOTQuestionForm from './components/AddOOTQuestion';
import ModalWindow from './components/ModalWindow';
import { Route, Routes, NavLink, useLocation, useNavigate, type Location } from 'react-router';
import AddFFQuestionForm from './components/AddFFQuestion';
import FamilyFeudQuestionItem from './components/FFQestionItem';


function highlight(value: string, location: Location) {
  if (location.pathname.includes(value)) {
    return 'text-accent font-semibold'
  }
}


type Question = OOT.Question | FF.Question

function App() {
  const location = useLocation()
  let navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([])
  const [isAddQuestionFormOpen, setIsAddQuestionFormOpen] = useState(false)
  const [currentGame, setCurrentGame] = useState<Game>()


  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/one-of-ten')
      setCurrentGame(Game.OOT)
    }
  }, [location.pathname, navigate])


  const QuestionListItem = useMemo(() => {
    if (location.pathname.includes('one-of-ten')) {
      setCurrentGame(Game.OOT)
      return OneOfTenQuestionItem
    }

    setCurrentGame(Game.FF)
    return FamilyFeudQuestionItem
  }, [location.pathname])


  const loadQuestionsFromFile = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const file = event.target.files?.item(0)

    if (file === null) return

    const content = await file?.text()

    if (content === undefined) return

    try {
      const data = JSON.parse(content)

      if (!Object.hasOwn(data, length)) {
        toast.error("Załadowany plik ma niepoprawny format.")
        return
      }

      setQuestions(data.map((item: any) => {
        if (item.id) return item

        return {
          ...item,
          id: crypto.randomUUID()
        }
      }))
    } catch (error) {
      toast.error(`Błąd ładowania pliku: ${error}`)
    }
  }

  const exportQuestionsToFile = () => {
    const dataStr = JSON.stringify(questions, null, 4)
    const blob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = 'questions.json'
    link.click()
    toast.success('Pytanie wyeksportowane pomyślnie!')

    URL.revokeObjectURL(url)
  }

  const removeQuestion = (id: string) => {
    const index = questions.findIndex(q => q.id === id)

    if (index == -1) return

    questions.splice(index, 1)
    setQuestions([...questions])
  }


  const addQuestion = (question: Question) => {
    setQuestions(prev => [...prev, question])
    setIsAddQuestionFormOpen(false)
  }

  const eraseQuestions = () => {
    if (window.confirm("Wyczyścić wszystkie pytania?")) {
      setQuestions([])
    }
  }

  const shuffleQuestions = () => {
    setQuestions([...questions.sort(() => Math.random() - 0.5)])
  }

  return (
    <div className='text-center flex flex-col h-full items-stretch gap-8 container p-3'>

      <header>
        <h1 className='text-5xl py-5'>
          Dodawanie pytań
        </h1>
        <nav className='flex justify-center gap-5'>
          do
          <NavLink to="/one-of-ten" className={highlight('one-of-ten', location)}>&gt;&nbsp;Jeden z dziesięciu</NavLink>
          <NavLink to="/family-feud" className={highlight('family-feud', location)}>&gt;&nbsp;Familiada</NavLink>
        </nav>
      </header>

      <div className='flex justify-evenly items-center py-3'>
        <div className='button' title='Wczytaj plik' role='button'>
          <label htmlFor="questions-file">Wczytaj plik</label>
          <input
            className='hidden'
            type="file"
            accept='.json'
            name="questions-file"
            id="questions-file"
            onChange={loadQuestionsFromFile}
          />
        </div>

        <button
          className='button'
          title='Zapisz do pliku'
          onClick={exportQuestionsToFile}
        >
          Zapisz do pliku
        </button>

        <button className='button' title='Wymieszaj pytania' onClick={shuffleQuestions}>
          Wymieszaj
        </button>

        <button
          className='button-red'
          title="Wyczyść pytania"
          onClick={eraseQuestions}
        >
          Wyczyść
        </button>
      </div>

      <span className='border-t border-main opacity-60 max-w-250 w-12/12 self-center '></span>

      <ModalWindow isOpen={isAddQuestionFormOpen} close={() => setIsAddQuestionFormOpen(false)}>
        <Routes>
          <Route index path='/one-of-ten' element={<AddOOTQuestionForm addQuestion={addQuestion} />} />
          <Route path='/family-feud' element={<AddFFQuestionForm addQuestion={addQuestion} />} />
        </Routes>
      </ModalWindow>

      <main className='flex flex-col max-w-200 w-12/12 self-center'>

        <div className='flex justify-between items-center sticky top-0 bg-light z-40 py-3'>
          <h2 className='text-3xl'>Lista pytań do "{currentGame}"</h2>

          <IoMdAddCircle
            title='Dodaj pytanie'
            onClick={() => setIsAddQuestionFormOpen(!isAddQuestionFormOpen)}
            className='cursor-pointer bg-inherit text-5xl text-main hover:scale-95 active:scale-90'
          />
        </div>

        <ul className='flex flex-col p-2 w-full gap-1'>
          {
            questions.map(q => <QuestionListItem
              key={q.id}
              // @ts-ignore
              data={q}
              removeQuestion={() => removeQuestion(q.id)}
            />)
          }
          {
            questions.length === 0 && (<li>
              <p className='text-dark opacity-65'>Brak pytań - dodaj kilka 😊</p>
            </li>)
          }
        </ul>

      </main>

      <footer className='fixed bottom-0 w-full py-2 opacity-30'>
        <p>&copy; 2026 Szymon Rykała</p>
      </footer>
    </div>
  )
}

export default App
