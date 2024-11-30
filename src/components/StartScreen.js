// src/components/StartScreen.jsx
const StartScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-yellow-400 via-pink-300 to-red-500">
  <div className="flex flex-col items-center bg-white shadow-2xl rounded-[50px] p-10 max-w-sm">
    <img
      src="../assets/don-gun.png"
      alt="Don Pollo"
      className="w-48 h-48 rounded-full shadow-lg mb-6"
    />
    <h1 className="text-5xl font-extrabold text-gray-800 mb-8 text-center">
      Don Pollo <span className="text-yellow-500">Quiz Challenge</span>
    </h1>
    <button
      onClick={onStart}
      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-5 px-12 rounded-[30px] shadow-2xl transform transition hover:scale-110 focus:ring-4 focus:ring-yellow-300"
    >
      Start Quiz
    </button>
  </div>
</div>

  );
};

export default StartScreen;
