const ResultScreen = ({ points, onRestart }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-400 via-purple-300 to-indigo-500 p-8">
      <div className="flex flex-col items-center bg-white shadow-2xl rounded-[100px] p-16 max-w-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Game Over!</h1>
        <p className="text-2xl font-semibold text-gray-700 mb-6">Your Score: {points}</p>

        <div className="flex space-x-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transform transition hover:scale-105"
            onClick={onRestart}
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;
