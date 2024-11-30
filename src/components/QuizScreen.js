import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ResultScreen from './ResultScreen';

const QuizScreen = ({onRestart}) => {
  const [question, setQuestion] = useState(null);
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hearts, setHearts] = useState(5);  // Player starts with 3 hearts
  const [points, setPoints] = useState(0);  // Initialize score

  useEffect(() => {
    if (hearts > 0) {
      fetchQuestion();
    }
  }, [hearts]);

  const fetchQuestion = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=1&type=multiple');
      const data = await response.json();
      setQuestion(data.results[0]);
      const shuffledOptions = [
        ...data.results[0].incorrect_answers,
        data.results[0].correct_answer
      ].sort(() => Math.random() - 0.5);
      setOptions(shuffledOptions);
    } catch (error) {
      console.error('Error fetching question:', error);
    }
    setLoading(false);
  };

  const audiosWrong = [
    "../audios/Bruh.mp3",
    "../audios/haiya.mp3",
    "../audios/Don_Pollo_1.mp3"
  ];
  const audioCorrect = [
    "../audios/Cheer.mp3"
  ];
  const images = [
    "../image/don-arrow.jpg",
    "../image/don-asi-no.jpg",
    "../image/don-call.jpg",
    "../image/don-calll.jpg",
    "../image/don-car.jpg",
    "../image/don-crown.jpg",
    "../image/don-eyes.jpg",
    "../image/don-glasses.jpg",
    "../image/don-legend.jpg",
    "../image/don-shine.jpg",
    "../image/don-stretch.webp",
    "../image/granola bar.jpg",
    "../image/kai-tweak.jpg",
    "../image/speed-huh.jpg",
  ]
  function showFlyingImage(imageUrl) {
    const container = document.getElementById('flying-text-container');
    if (!container) {
        console.error('Container not found');
        return;
    }

    const flyingImage = document.createElement('img');

    // Set image source and styles
    flyingImage.src = imageUrl;
    flyingImage.style.position = 'absolute';
    flyingImage.style.width = `${Math.random() * 100 + 100}px`; // Random width between 100px and 200px
    flyingImage.style.zIndex = '1000';

    // Random start position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    flyingImage.style.left = `${startX}px`;
    flyingImage.style.top = `${startY}px`;

    // Append to container
    container.appendChild(flyingImage);

    // Animate the image
    const animationDuration = 1500; // 1.5 seconds
    flyingImage.animate(
        [
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(-100px)', opacity: 0 },
        ],
        {
            duration: animationDuration,
            easing: 'ease-out',
        }
    );

    // Remove image after animation, with a safeguard
    setTimeout(() => {
        if (container.contains(flyingImage)) {
            container.removeChild(flyingImage);
        }
    }, animationDuration);
}


  const handleAnswer = (selected) => {
    const isCorrect = selected === question.correct_answer;
    if (isCorrect) {
      setPoints(points + 1);  // Increment points on correct answer
      const randomAudio = audioCorrect[0];
      const audio = new Audio(randomAudio);
      audio.play();
    } else {
      setHearts(hearts - 1);  // Decrease a heart on wrong answer
      const randomAudio = audiosWrong[Math.floor(Math.random() * audiosWrong.length)];
      const audio = new Audio(randomAudio);
      const randomImg = images[Math.floor(Math.random() * images.length)];
      showFlyingImage(randomImg);
      audio.play();
    }

    setResult({
      correct: isCorrect,
      message: isCorrect ? 'CORRECT!' : 'WRONG!'
    });

    setTimeout(() => {
      if (hearts > 0) {
        setResult(null);
        fetchQuestion();
      }
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (hearts <= 0) return <ResultScreen points={points} onRestart={onRestart} />;;

  return (
    <div id='flying-text-container' className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-pink-400 via-purple-300 to-indigo-500">
      <div  className="flex flex-col items-center bg-white shadow-2xl rounded-[100px] p-16 max-w-sm">
        <div className="text-xl mb-6" dangerouslySetInnerHTML={{ __html: question?.question }} />

        <div className="grid grid-cols-1 gap-4">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
              dangerouslySetInnerHTML={{ __html: option }}
            />
          ))}
        </div>

        {result && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`mt-6 text-2xl font-bold text-center ${result.correct ? 'text-green-500' : 'text-red-500'}`}
          >
            {result.message}
          </motion.div>
        )}

        <div className="mt-8 flex items-center">
          <div className="text-lg mr-4">Hearts: {hearts}</div>
          <div className="text-lg">Score: {points}</div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
