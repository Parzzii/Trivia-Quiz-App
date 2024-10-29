import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import "./QuestionPage.css";
import Header from "./Header";
import Footer from "./Footer";

const QuestionPage = () => {
  const { state } = useLocation();
  const { topicId, difficulty, playerName } = state || {};
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [quizEnded, setQuizEnded] = useState(false);
  const [score, setScore] = useState(0);
  const [allCorrect, setAllCorrect] = useState(false);
  const [hitChances, setHitChances] = useState(2);
  const [usedHitChance, setUsedHitChance] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);

  // Using useRef for stable references to audio files
  const backgroundMusic = useRef(new Audio("/background-music.mp3"));
  const endQuizSound = useRef(new Audio("/celebration.mp3"));

  useEffect(() => {
    fetchQuestions();
  }, [topicId, difficulty]);

  useEffect(() => {
    backgroundMusic.current.loop = true;
    backgroundMusic.current.play().catch((error) => {
      console.error("Audio play error:", error);
    });

    return () => {
      backgroundMusic.current.pause();
      backgroundMusic.current.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (quizEnded) {
      backgroundMusic.current.pause();
      backgroundMusic.current.currentTime = 0;
      endQuizSound.current.play().catch((error) => {
        console.error("Audio play error:", error);
      });
    }
  }, [quizEnded]);

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

  const handleAnswerClick = (answer) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answer);
      const correct = answer === questions[currentQuestionIndex].correctAnswer;
      setIsCorrect(correct);
      setShowCorrectAnswer(true);
      setShowNextQuestion(true);

      if (correct) {
        setScore((prevScore) => prevScore + 20);
      } else {
        setScore((prevScore) => prevScore - 5);
      }

      setAnsweredQuestions((prevAnswered) => [
        ...prevAnswered,
        {
          question: questions[currentQuestionIndex].question,
          correctAnswer: questions[currentQuestionIndex].correctAnswer,
        },
      ]);
    }
  };

  const handleNextQuestionClick = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      resetQuestionState();
    } else {
      handleEndQuiz();
      setQuizEnded(true);

      const maxScore = difficulty === "hard" ? 200 : difficulty === "medium" ? 140 : 100;
      if (score === maxScore) {
        setAllCorrect(true);
      }
    }
  };

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowCorrectAnswer(false);
    setShowNextQuestion(false);
    setUsedHitChance(false);
  };

  const handleEndQuiz = async () => {
    await fetch("/api/leaderboard", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: playerName, score, gameMode: difficulty }),
    });
  };

  // Hint Feature Logic
  const useHitChance = () => {
    if (hitChances > 0 && !usedHitChance && questions[currentQuestionIndex]) {
      const currentAnswers = questions[currentQuestionIndex].answers;
      const wrongAnswers = currentAnswers.filter((answer) => answer !== questions[currentQuestionIndex].correctAnswer);

      if (wrongAnswers.length > 0) {
        const randomWrongAnswer = wrongAnswers[Math.floor(Math.random() * wrongAnswers.length)];

        const updatedAnswers = currentAnswers.filter((answer) => answer !== randomWrongAnswer);
        const updatedQuestions = [...questions];
        updatedQuestions[currentQuestionIndex].answers = updatedAnswers;
        setQuestions(updatedQuestions);

        setUsedHitChance(true);
        setHitChances((prevChances) => prevChances - 1);
      }
    }
  };

  const handleReplay = () => {
    window.location.reload();
  };

  const handleBack = () => {
    navigate("/choose-topic");
  };

  const handleShowAnswers = () => {
    setShowAnswers(true);
  };

  return (
    <div className="question-page-container">
      <Header />

      {allCorrect && <Confetti />}

      <div className="question-container">
        {loading ? (
          <p>Loading questions...</p>
        ) : quizEnded ? (
          <div className="score-section">
            <h2>Your Final Score</h2>
            <p>{score}</p>
            {allCorrect && <h3>Congratulations! You got all answers right!</h3>}

            {!showAnswers && (
              <button onClick={handleShowAnswers} className="show-answers-btn">
                Show Answers
              </button>
            )}

            {showAnswers && (
              <div className="answered-questions">
                <h3>Questions and Correct Answers:</h3>
                <ul>
                  {answeredQuestions.map((item, index) => (
                    <li key={index}>
                      <strong>Q:</strong> <span dangerouslySetInnerHTML={{ __html: item.question }} />
                      <br />
                      <strong>Correct Answer:</strong> <span dangerouslySetInnerHTML={{ __html: item.correctAnswer }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="end-options">
              <ul>
                <li>
                  <button onClick={handleReplay}>Replay</button>
                </li>
                <li>
                  <button onClick={handleBack}>Back</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {questions.length > 0 && (
              <>
                <div className="question-header">
                  <p className="question-number">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </p>
                  {hitChances > 0 && !usedHitChance && (
                    <button className="hit-chance-btn" onClick={useHitChance}>
                      Use Hit Chance ({hitChances} left)
                    </button>
                  )}
                </div>

                <h2 dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
                <ul>
                  {questions[currentQuestionIndex].answers.map((answer, index) => (
                    <li
                      key={index}
                      className={`answer-option 
                        ${selectedAnswer === answer ? (isCorrect ? "correct" : "selected") : ""} 
                        ${showCorrectAnswer && answer === questions[currentQuestionIndex].correctAnswer ? "correct" : ""}`}
                      onClick={() => handleAnswerClick(answer)}
                      dangerouslySetInnerHTML={{ __html: answer }}
                    />
                  ))}
                </ul>

                {selectedAnswer && <p className={isCorrect ? "correct-text" : "incorrect-text"}>{isCorrect ? "Correct!" : `Incorrect! The correct answer is: ${questions[currentQuestionIndex].correctAnswer}`}</p>}

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
