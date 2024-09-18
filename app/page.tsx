'use client';

import React, { useState, useEffect, useCallback } from 'react';

const WordleClone: React.FC = () => {
  const [word, setWord] = useState<string>('');
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    newGame();
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const checkMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const newGame = () => {
    fetch('https://random-word-api.herokuapp.com/word?length=5')
      .then(response => response.json())
      .then(data => setWord(data[0].toUpperCase()))
      .catch(() => setWord('REACT'));
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
    <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 text-gray-800 p-4" onKeyDown={handleKeyPress} tabIndex={0}>
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Wordle Clone</h1>
        
        {/* Game Board */}
        <div className="grid grid-rows-6 gap-2 mb-6">
          {[...Array(6)].map((_, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, colIndex) => {
                const letter: string = guesses[rowIndex]?.[colIndex] || (rowIndex === guesses.length ? currentGuess[colIndex] : '');
                const bgColor: string = getLetterColor(letter, colIndex, rowIndex);
                return (
                  <div key={colIndex} className={`aspect-square flex items-center justify-center text-2xl font-bold rounded-md border-2 ${bgColor} transition-colors duration-300`}>
                    {letter}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Keyboard */}
        <div className="grid grid-rows-3 gap-2 mb-4">
          {['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'].map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1">
              {row.split('').map((key) => (
                <button
                  key={key}
                  className="w-8 h-10 bg-gray-300 rounded flex items-center justify-center font-semibold text-sm hover:bg-gray-400 transition-colors duration-200"
                  onClick={() => !gameOver && setCurrentGuess(prev => prev.length < 5 ? prev + key : prev)}
                  disabled={gameOver}
                >
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Submit button */}
        {!gameOver && (
          <button
            className="w-full mb-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-lg font-semibold transition-colors duration-200"
            onClick={submitGuess}
            disabled={currentGuess.length !== 5}
          >
            Submit
          </button>
        )}

        {/* Game status and New Game button */}
        <div className="text-center">
          {gameOver && (
            <>
              <div className="text-xl font-bold mb-4">
                {currentGuess === word ? 'You won!' : `Game over! The word was ${word}`}
              </div>
              <button
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 text-lg font-semibold transition-colors duration-200"
                onClick={newGame}
              >
                New Game
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WordleClone;
