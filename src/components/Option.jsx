import { useContext } from "react"
import { QuizContext } from "../context/quiz"

import './Option.css'

const Option = ({ option, selectOption, answer }) => {
const [quizState, dispatch] = useContext(QuizContext);
  return (
    <div onClick={() => selectOption()}
    className={`option ${quizState.answerSelected && 
    option === answer ? "correct" : "" }
    ${quizState.answerSelected && option !== answer ? "wrong" : "" 
    }`}>
        <p>{option}</p>    
    </div>
  )
}

export default Option