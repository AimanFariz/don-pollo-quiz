// src/App.jsx
import { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';

function App() {
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [points, setPoints] = useState(0);
  const [hearts, setHearts] = useState(3);

  const handleRestart = () => {
    setIsQuizStarted(false); // Go back to the StartScreen
    setPoints(0); // Reset points
    setHearts(3); // Reset hearts
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!isQuizStarted ? (
        <StartScreen onStart={() => setIsQuizStarted(true)} />
      ) : hearts <= 0 ? (
        <ResultScreen points={points} onRestart={handleRestart} />
      ) : (
        <QuizScreen
        onRestart={handleRestart}
          points={points}
          setPoints={setPoints}
          hearts={hearts}
          setHearts={setHearts}
        />
      )}
    </div>
  );
}

export default App;