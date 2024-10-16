import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti"; // Import Confetti
import "./QuestionPage.css"; // Use the same CSS file as Random.js
import Header from "./Header";
import Footer from "./Footer";

const QuestionPage = () => {
  const { state } = useLocation();
  const { topicId, difficulty } = state || {};
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [progress, setProgress] = useState(100);
  const [timerActive, setTimerActive] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [allCorrect, setAllCorrect] = useState(false); // Track if all answers are correct

  const fetchQuestions = async () => {
    if (!topicId || !difficulty) {
      console.error("Topic ID or difficulty is missing.");
      return;
    }

    setLoading(true);
    try {
      const questionCount = difficulty === "hard" ? 10 : difficulty === "medium" ? 7 : 5;
      const response = await fetch(`https://opentdb.com/api.php?amount=${questionCount}&category=${topicId}&difficulty=${difficulty}&type=multiple`);
      const data = await response.json();

      const formattedQuestions = data.results.map((item) => ({
        question: item.question,
        correctAnswer: item.correct_answer,
        answers: [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5),
      }));

      setQuestions(formattedQuestions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [topicId, difficulty]);

  useEffect(() => {
    if (timerActive && progress > 0) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress - 4;
          if (newProgress <= 0) {
            clearInterval(interval);
            setShowNextQuestion(true);
          }
          return newProgress;
        });
      }, 62.5);

      return () => clearInterval(interval);
    }
  }, [timerActive, progress]);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      const correct = answer === questions[currentQuestionIndex].correctAnswer;
      setIsCorrect(correct);
      setShowCorrectAnswer(true);
      setTimerActive(true);

      if (correct) {
        setScore((prevScore) => prevScore + 20);
      } else {
        setScore((prevScore) => prevScore - 5);
      }
    }
  };

  const handleNextQuestionClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      resetQuestionState();
    } else {
      setQuizEnded(true);

      // Check if all answers were correct (i.e., max score based on difficulty)
      const maxScore = difficulty === "hard" ? 200 : difficulty === "medium" ? 140 : 100;
      if (score === maxScore) {
        setAllCorrect(true); // All answers were correct
      }
    }
  };

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowCorrectAnswer(false);
    setShowNextQuestion(false);
    setProgress(100);
    setTimerActive(false);
  };

  const handleReplay = () => {
    window.location.reload();
  };

  const handleBack = () => {
    navigate("/choose-topic");
  };

  const handleSkip = () => {
    navigate("/");
  };

  return (
    <div className="question-page-container">
      <Header />

      {/* Confetti celebration if all answers are correct */}
      {allCorrect && <Confetti />}

      <div className="question-container">
        {loading ? (
          <p>Loading questions...</p>
        ) : quizEnded ? (
          <div className="score-section">
            <h2>Your Final Score</h2>
            <p>{score}</p>
            {allCorrect && <h3>Congratulations! You got all answers right!</h3>}
            <div className="end-options">
              <ul>
                <li>
                  <button onClick={() => console.log(questions)}>Answers</button>
                </li>
                <li>
                  <button onClick={handleReplay}>Replay</button>
                </li>
                <li>
                  <button onClick={handleBack}>Back</button>
                </li>
                <li>
                  <button onClick={handleSkip}>Skip</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {questions.length > 0 && (
              <>
                <p className="question-number">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <h2 dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
                <ul>
                  {questions[currentQuestionIndex].answers.map((answer, index) => (
                    <li
                      key={index}
                      className={`answer-option 
                        ${selectedAnswer === answer ? (isCorrect ? "correct" : "selected") : ""}
                        ${showCorrectAnswer && answer === questions[currentQuestionIndex].correctAnswer ? "correct" : ""}
                      `}
                      onClick={() => handleAnswerClick(answer)}
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                  ))}
                </ul>

                {selectedAnswer && <p className={isCorrect ? "correct-text" : "incorrect-text"}>{isCorrect ? "Correct!" : `Incorrect! The correct answer is: ${questions[currentQuestionIndex].correctAnswer}`}</p>}

                {selectedAnswer && (
                  <div className="progress-bar-wrapper">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                  </div>
                )}

                {showNextQuestion && (
                  <button className="next-question-btn fade-in" onClick={handleNextQuestionClick}>
                    Next Question
                  </button>
                )}
              </>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default QuestionPage;
