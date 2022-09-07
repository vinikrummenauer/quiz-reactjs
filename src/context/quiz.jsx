import {createContext, useReducer } from "react";
import questions from '../data/questions'

const STAGES = ["Start", "Playing", "End"]

const initialState = {
    gameStage: STAGES[0],
    questions,
    currentQuestion: 0,
    score: 0,
    answerSelected: false,
};

const quizReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_STAGE":
        return {
          ...state,
          gameStage: STAGES[1],
        };

      case "REORDER_QUESTIONS":
        const reorderedQuestions = questions.sort(() => {
            return Math.random() - 0.5;
        })
        return {
            ...state,
            questions: reorderedQuestions,
        }

      case "CHANGE_QUESTION":
        const nextQuestion = state.currentQuestion + 1;
        let endGame = false

        if(!questions[nextQuestion]) {
            endGame = true;
        }

        return{
            ...state,
            currentQuestion: nextQuestion,
            gameStage: endGame ? STAGES[2] : state.gameStage,
            answerSelected: false,
        }
      
      case "NEW_GAME":
        return initialState;

      case "CHECK_ANSWER":
        if(state.answerSelected) return state;

        const answer = action.payload.answer
        const option = action.payload.option
        let correctAnswer = 0

        if(answer === option) correctAnswer = 1;

        return {
          ...state,
          score: state.score + correctAnswer,
          answerSelected: option,
        }
      
        default:
            return state;
    }

}

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(quizReducer, initialState);

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};