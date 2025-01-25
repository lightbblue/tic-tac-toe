import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from "./constants.js"
import { Square } from "./components/Square"
import { WinnerModal } from "./components/WinnerModal"
import { Footer } from './components/Footer/Footer.jsx'
import { checkWinnerFrom, checkEndGame } from './assets/logic/board.js'
import { resetGameStorage, saveGameToStorage } from './assets/logic/storage/index.js'
import './App.css'

function App() {
  const [board,setBoard] = useState(() =>{
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage ? JSON.parse(boardFromLocalStorage)
    : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() =>{
    const turnFromLocalStorage = window.localStorage.getItem('turn');
    return turnFromLocalStorage ?? TURNS.X
  });

  // null = no hay ganador, false = empate
  const [winner,setWinner] = useState(null);
  
  checkWinnerFrom(board)


  const resetGame = () =>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
  }

  const updateBoard = (index) =>{
    if(board[index] || winner)return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    saveGameToStorage({board: newBoard, turn: newTurn})

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }

  }

  return (
    <>
      <main className='game'>
        <h1>Tic Tac Toe</h1>
        <button onClick={resetGame}>Reset</button>
        <section className='board'>
          {board.map((_,index)=>{
            return(
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })}
        </section>

        <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame}></WinnerModal>
      </main>
      <Footer></Footer>
    </>
  )
}

export default App
