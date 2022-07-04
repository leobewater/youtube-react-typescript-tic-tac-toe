import { useState } from 'react'
import Square from './Square';

const INITIAL_GAME_STATE = ["", "", "", "", "", "", "", "", ""];

function Game() {
  const [gameState, setGameState] = useState(INITIAL_GAME_STATE)
  const [currentPlayer, setCurrentPlayer] = useState('X')

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
    // set X to the cell
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
        <div>Scores Go Here</div>
      </div>
    </div>
  )
}

export default Game
