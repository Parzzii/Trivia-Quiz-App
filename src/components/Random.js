import React, { useState, useEffect, useRef } from "react";
import "./Random.css";
import Header from "./Header";
import Footer from "./Footer";

const Random = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [progress, setProgress] = useState(100);

  const backgroundMusic = useRef(new Audio(`${process.env.PUBLIC_URL}/background-music.mp3`));
  const gameOverSound = useRef(new Audio(`${process.env.PUBLIC_URL}/game-over.mp3`));

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
      const data = await response.json();
      const formattedQuestions = data.results.map((questionData) => ({
        question: questionData.question,
        correctAnswer: questionData.correct_answer,
        answers: [...questionData.incorrect_answers, questionData.correct_answer].sort(() => Math.random() - 0.5),
      }));
      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    fetchQuestions();

    // Start background music
    backgroundMusic.current.loop = true;
    backgroundMusic.current.play().catch((error) => {
      console.error("Background music play error:", error);
    });
  };

  useEffect(() => {
    // Cleanup background music when component unmounts
    return () => {
      backgroundMusic.current.pause();
      backgroundMusic.current.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (gameOver) {
      // Stop background music and reset it
      backgroundMusic.current.pause();
      backgroundMusic.current.currentTime = 0;

      // Play game-over sound
      gameOverSound.current.play().catch((error) => {
        console.error("Game over sound play error:", error);
      });
    }
  }, [gameOver]);

  useEffect(() => {
    if (selectedAnswer !== null) {
      const timerId = setTimeout(() => {
        handleNextQuestion();
      }, 3000);

      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 100 / 30, 0));
      }, 100);

      return () => {
        clearTimeout(timerId);
        clearInterval(progressInterval);
      };
    }
  }, [selectedAnswer]);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      setIsCorrect(answer === questions[currentQuestionIndex].correctAnswer);

      if (answer === questions[currentQuestionIndex].correctAnswer) {
        setCorrectAnswers((prev) => prev + 1);
      } else {
        setGameOver(true); // Set game over if the answer is incorrect
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setProgress(100);
    } else {
      setGameOver(true); // End game if no more questions
    }
  };

  const handlePlayAgain = () => {
    window.location.reload();
  };

  return (
    <div className="random-page-container">
      <Header />
      <div className="random-container">
        {!gameStarted ? (
          <button className="start-game-btn" onClick={startGame}>
            Start Game
          </button>
        ) : gameOver ? (
          <div>
            <h2>Game Over!</h2>
            <p>Your score: {correctAnswers}</p>
            <button className="random-replay-btn" onClick={handlePlayAgain}>
              Play Again
            </button>
          </div>
        ) : loading ? (
          <p>Loading questions...</p>
        ) : (
          <>
            {questions[currentQuestionIndex] && (
              <div>
                <h2 dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
                <ul>
                  {questions[currentQuestionIndex].answers.map((answer, index) => (
                    <li
                      key={index}
                      className={`random-answer-option 
                        ${selectedAnswer === answer ? (isCorrect ? "correct" : "selected") : ""}`}
                      onClick={() => handleAnswerClick(answer)}
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                  ))}
                </ul>
                {selectedAnswer && (
                  <p className={isCorrect ? "correct-text" : "incorrect-text"}>
                    {isCorrect ? "Correct!" : `Incorrect! The correct answer is: ${questions[currentQuestionIndex].correctAnswer}`}
                  </p>
                )}
                <div className="timer-bar" style={{ width: `${progress}%` }} />
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Random;
