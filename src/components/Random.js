import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Random.css"; // Use the same CSS file as QuestionPage.css
import Header from "./Header";
import Footer from "./Footer";

const Random = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [bonusQuestionIndex, setBonusQuestionIndex] = useState(0); // State for tracking bonus question index
  const [bonusQuestions, setBonusQuestions] = useState([]); // State to hold bonus questions
  const [progress, setProgress] = useState(100); // Progress bar state
  const [isCountdown, setIsCountdown] = useState(true); // State to track countdown
  const [countdown, setCountdown] = useState(3); // Countdown state

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error("No questions found in the API response.");
      }

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

  const fetchBonusQuestions = async () => {
    // Fetch an additional set of bonus questions
    setLoading(true);
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        throw new Error("No questions found in the API response.");
      }

      const formattedQuestions = data.results.map((questionData) => ({
        question: questionData.question,
        correctAnswer: questionData.correct_answer,
        answers: [...questionData.incorrect_answers, questionData.correct_answer].sort(() => Math.random() - 0.5),
      }));

      setBonusQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error fetching bonus questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions(); // Load questions on component mount
  }, []);

  useEffect(() => {
    if (selectedAnswer !== null) {
      const timerId = setTimeout(() => {
        handleNextQuestion(); // Move to next question after 3 seconds
      }, 3000); // 3 seconds timer

      // Animate the progress bar
      const progressInterval = setInterval(() => {
        setProgress((prev) => Math.max(prev - 100 / 30, 0)); // Decrease progress over 3 seconds
      }, 100); // Adjust this interval as needed

      return () => {
        clearTimeout(timerId); // Cleanup the timer on component unmount or reset
        clearInterval(progressInterval); // Cleanup the progress interval
      };
    }
  }, [selectedAnswer]);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      setIsCorrect(answer === questions[currentQuestionIndex].correctAnswer);
      setShowCorrectAnswer(true);

      if (answer === questions[currentQuestionIndex].correctAnswer) {
        setCorrectAnswers((prev) => prev + 1);
      } else {
        setGameOver(true); // Show Game Over if answer is wrong
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowCorrectAnswer(false);
    setProgress(100); // Reset progress for next question

    // Check if the user has answered all questions correctly
    if (currentQuestionIndex + 1 === questions.length && correctAnswers === questions.length) {
      setBonusQuestionIndex(0); // Reset bonus question index
      fetchBonusQuestions(); // Fetch new bonus questions
    } else if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else if (bonusQuestionIndex < bonusQuestions.length) {
      setCurrentQuestionIndex(0); // Reset index for bonus questions
      setBonusQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      fetchQuestions(); // Fetch new questions if all are answered
    }
  };

  const handlePlayAgain = () => {
    window.location.reload(); // Reloads the current page
  };

  return (
    <div className="random-page-container">
      <Header />
      <div className="random-container">
        {loading ? (
          <p>Loading questions...</p>
        ) : gameOver ? (
          <>
            <h2>Game Over!</h2>
            <p>Your score: {correctAnswers}</p>
            <button className="random-replay-btn" onClick={handlePlayAgain}>
              Play Again
            </button>
          </>
        ) : (
          <>
            {bonusQuestionIndex > 0 && (
              <h2>{`Bonus Question ${bonusQuestionIndex}`}</h2> // Show bonus question message
            )}
            {questions[currentQuestionIndex] && (
              <>
                <h2 dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
                <ul>
                  {bonusQuestionIndex > 0
                    ? // Render bonus questions
                      bonusQuestions[bonusQuestionIndex - 1]?.answers.map((answer, index) => (
                        <li
                          key={index}
                          className={`random-answer-option 
                          ${selectedAnswer === answer ? (isCorrect ? "correct" : "selected") : ""} 
                          ${showCorrectAnswer && answer === bonusQuestions[bonusQuestionIndex - 1].correctAnswer ? "correct" : ""}`}
                          onClick={() => handleAnswerClick(answer)}
                          dangerouslySetInnerHTML={{ __html: answer }}
                        />
                      ))
                    : // Render regular questions
                      questions[currentQuestionIndex].answers.map((answer, index) => (
                        <li
                          key={index}
                          className={`random-answer-option 
                          ${selectedAnswer === answer ? (isCorrect ? "correct" : "selected") : ""} 
                          ${showCorrectAnswer && answer === questions[currentQuestionIndex].correctAnswer ? "correct" : ""}`}
                          onClick={() => handleAnswerClick(answer)}
                          dangerouslySetInnerHTML={{ __html: answer }}
                        />
                      ))}
                </ul>
              </>
            )}

            {/* Display feedback after an answer is selected */}
            {selectedAnswer && <p className={isCorrect ? "correct-text" : "incorrect-text"}>{isCorrect ? "Correct!" : `Incorrect! The correct answer is: ${bonusQuestionIndex > 0 ? bonusQuestions[bonusQuestionIndex - 1].correctAnswer : questions[currentQuestionIndex].correctAnswer}`}</p>}

            {/* Timer Bar */}
            <div className="timer-bar" style={{ width: `${progress}%` }} />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Random;
