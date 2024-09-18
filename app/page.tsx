'use client';

import React, { useState, useEffect } from 'react';

const WordleClone: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);

  useEffect(() => {
    newGame();
  }, []);

  const newGame = () => {
    // Fetch a random 5-letter word from an API or use a predefined list
    fetch('https://random-word-api.herokuapp.com/word?length=5')
      .then(response => response.json())
      .then(data => setWord(data[0].toUpperCase()))
      .catch(() => setWord('REACT')); // Fallback word if API fails
    setGuesses([]);
    setCurrentGuess('');
    setGameOver(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (gameOver) return;
    
    if (e.key === 'Enter' && currentGuess.length === 5) {
      submitGuess();
    } else if (e.key === 'Backspace') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5 && e.key.match(/^[a-zA-Z]$/)) {
      setCurrentGuess(prev => prev + e.key.toUpperCase());
    }
  };

  const submitGuess = () => {
    if (currentGuess.length === 5) {
      setGuesses(prev => [...prev, currentGuess]);
      setCurrentGuess('');
      if (currentGuess === word) {
        setGameOver(true);
      } else if (guesses.length === 5) {
        setGameOver(true);
      }
    }
  };

  const getLetterColor = (letter: string, index: number, rowIndex: number) => {
    if (rowIndex >= guesses.length) return 'bg-white';
    if (!word.includes(letter)) return 'bg-gray-400';
    return word[index] === letter ? 'bg-green-500' : 'bg-yellow-500';
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-8 bg-gray-100 text-black" onKeyDown={handleKeyPress} tabIndex={0}>
      <h1 className="text-4xl font-bold mb-8">Wordle Clone</h1>
      
      {/* Game Board */}
      <div className="grid grid-rows-6 gap-2 mb-8">
        {[...Array(6)].map((_, rowIndex) => (
          <div key={rowIndex} className="flex items-center">
            <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, colIndex) => {
                const letter = guesses[rowIndex]?.[colIndex] || (rowIndex === guesses.length ? currentGuess[colIndex] : '');
                const bgColor = getLetterColor(letter, colIndex, rowIndex);
                return (
                  <div key={colIndex} className={`w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold ${bgColor}`}>
                    {letter}
                  </div>
                );
              })}
            </div>
            {rowIndex === guesses.length && !gameOver && (
              <button
                className="ml-2 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                onClick={submitGuess}
                disabled={currentGuess.length !== 5}
              >
                Submit
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Keyboard */}
      <div className="grid grid-rows-3 gap-2">
        {['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.split('').map((key) => (
              <button
                key={key}
                className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center font-semibold"
                onClick={() => !gameOver && setCurrentGuess(prev => prev.length < 5 ? prev + key : prev)}
                disabled={gameOver}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Game status and New Game button */}
      <div className="mt-4 text-xl font-bold">
        {gameOver && (
          <>
            <div>{currentGuess === word ? 'You won!' : `Game over! The word was ${word}`}</div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={newGame}
            >
              New Game
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default WordleClone;
