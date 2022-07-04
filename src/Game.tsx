import { useEffect, useState } from 'react'
import Square from './Square';

type Scores = {
  [key: string]: number
}

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];
const INITIAL_SCORES: Scores = { X: 0, O: 0 }
const WINNING_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function Game() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE)
  const [currentPlayer, setCurrentPlayer] = useState('X') // X | O
  const [scores, setScores] = useState(INITIAL_SCORES)

  // get saved score from localstorage
  useEffect(() => {
    const storedScores = localStorage.getItem('scores')
    if (storedScores) {
      setScores(JSON.parse(storedScores))
    }
  }, [])

  // similar to vue calculate
  // every time gameState changes, check for winner and change player
  useEffect(() => {
    checkForWinner()
  }, [gameState])

  const resetboard = () => setGameState(INITIAL_GAME_STATE);

  const handleWin = () => {
    window.alert(`Congrats player ${currentPlayer}! You are the winner!`)

    // set player's score
    const newScores = { ...scores }
    newScores[currentPlayer] = scores[currentPlayer] + 1
    setScores(newScores)

    // save scores to localstorage
    localStorage.setItem('scores', JSON.stringify(newScores))

    resetboard()
  }

  const handleDraw = () => {
    window.alert(`The game ended in a draw`)

    resetboard()
  }

  const checkForWinner = () => {
    let roundWon = false

    // loop and check for winning combination
    for (let i = 0; i < WINNING_COMBOS.length; i++) {
      const winCombo = WINNING_COMBOS[i];

      let a = gameState[winCombo[0]]
      let b = gameState[winCombo[1]]
      let c = gameState[winCombo[2]]

      // continue if cell is empty
      if ([a, b, c].includes("")) {
        continue;
      }

      // check if all a,b,c have the same value, if yes, break loop
      if (a === b && b === c) {
        roundWon = true
        break;
      }
    }

    if (roundWon) {
      setTimeout(() => handleWin(), 500)
      return;
    }

    // if gamestate doesn't includes any empty cell
    if (!gameState.includes("")) {
      setTimeout(() => handleDraw(), 500)
      return
    }

    changePlayer();
  }

  const changePlayer = () => {
    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X')
  }

  const handleCellClick = (event: any) => {
    // console.log("cell clicked!", event.target.getAttribute('data-cell-index'))
    const cellIndex = Number(event.target.getAttribute('data-cell-index'))

    // check the game state value
    const currentValue = gameState[cellIndex]
    // return when there is a value in the cell
    if (currentValue) {
      return
    }

    // close the gameState array
    const newValues = [...gameState]
    // set X/O to the cell
    newValues[cellIndex] = currentPlayer
    // reassign gameState
    setGameState(newValues)
  }

  return (
    <div className='h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500'>
      <h1 className='text-center text-5xl mb-4 font-display text-white'>Tic Tac Toe Game Page</h1>
      <div>
        <div className='grid grid-cols-3 gap-3 mx-auto w-96'>
          {gameState.map((player, index) => (
            <Square key={index} onClick={handleCellClick} {...{ index, player }} />
          ))}
        </div>
        <div className='mx-auto w-96 text-2xl text-serif'>
          <p className='text-white mt-5'>Next Player: <span>{currentPlayer}</span></p>
          <p className='text-white mt-5'>Player X wins: <span>{scores['X']}</span></p>
          <p className='text-white mt-5'>Player O wins: <span>{scores['O']}</span></p>
        </div>
      </div>
    </div>
  )
}

export default Game
