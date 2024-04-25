import React, { useState } from 'react';
import GAME_MODES from './constants/gameModes';
import Cards from './components/Cards';
import './style.css';

export default function App() {
  const [gameMode, setGameMode] = useState();

  return (
    <div className="app">
      <h1>Memory Game</h1>
      {gameMode == null ? (
        <>
          <p>Please select game mode</p>
          <div className="game-mode-select">
            {GAME_MODES.map((mode) => (
              <button
                key={Object.keys(mode)[0]}
                onClick={() => setGameMode(Object.values(mode)[0])}
              >
                {Object.keys(mode)[0]}
              </button>
            ))}
          </div>
        </>
      ) : (
        <Cards layout={gameMode} handleRestart={() => setGameMode(null)} />
      )}
    </div>
  );
}
