import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import "./QuestionPage.css";
import { useTranslation } from "react-i18next";  
import Header from "./Header";
import Footer from "./Footer";

const QuestionPage = () => {
  const { state } = useLocation();
  const { topicId, difficulty, userName } = state || {};
  const navigate = useNavigate();
  const { t } = useTranslation(); 
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
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [hitChances, setHitChances] = useState(2); // Number of hints available
  const [usedHitChance, setUsedHitChance] = useState(false); // Check if hint was used on current question

  // Audio references
  const backgroundMusic = useRef(new Audio("/background-music.mp3"));
  const endQuizSound = useRef(new Audio("/celebration.mp3"));
  const perfectScoreSound = useRef(new Audio("/perfect-score.mp3")); // Special sound for perfect score

  useEffect(() => {
    fetchQuestions();
  }, [topicId, difficulty]);

  useEffect(() => {
    // Play background music and set it to loop
    backgroundMusic.current.loop = true;
    backgroundMusic.current.play().catch((error) => {
      console.error("Audio play error:", error);
    });

    // Pause and reset music when component unmounts
    return () => {
      backgroundMusic.current.pause();
      backgroundMusic.current.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (quizEnded) {
      // Stop background music
      backgroundMusic.current.pause();
      backgroundMusic.current.currentTime = 0;

      // Play special soundtrack if all answers are correct, else play endQuizSound
      if (allCorrect) {
        perfectScoreSound.current.play().catch((error) => {
          console.error("Perfect score sound play error:", error);
        });
      } else {
        endQuizSound.current.play().catch((error) => {
          console.error("End quiz sound play error:", error);
        });
      }
    }
  }, [quizEnded, allCorrect]);

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
      handleEndQuiz(); // End quiz if it's the last question
      setQuizEnded(true);

      const maxScore = difficulty === "hard" ? 200 : difficulty === "medium" ? 140 : 100;
      if (score === maxScore) {
        setAllCorrect(true); // Trigger perfect score confetti and special soundtrack
      }
    }
  };

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowCorrectAnswer(false);
    setShowNextQuestion(false);
    setUsedHitChance(false); // Reset hint usage for the next question
  };

  const handleEndQuiz = async () => {
    const token = localStorage.getItem("authToken");
    const name = localStorage.getItem("username");
    await fetch("http://localhost:5002/api/leaderboard/update", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, score, gameMode: difficulty }),
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
          <p>{t("loading_questions")}...</p>
        ) : quizEnded ? (
          <div className="score-section">
            <h2>{t("your_final_score")}</h2>
            <p>{score}</p>
            {allCorrect && <h3>{t("congratulations_all_correct")}</h3>}

            {!showAnswers && (
              <button onClick={handleShowAnswers} className="show-answers-btn">
                {t("show_answers")}
              </button>
            )}

            {showAnswers && (
              <div className="answered-questions">
                <h3>{t("questions_and_correct_answers")}s:</h3>
                <ul>
                  {answeredQuestions.map((item, index) => (
                    <li key={index}>
                      <strong>Q:</strong> <span dangerouslySetInnerHTML={{ __html: item.question }} />
                      <br />
                      <strong>{t("correct_answer")}:</strong> <span dangerouslySetInnerHTML={{ __html: item.correctAnswer }} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="end-options">
              <ul>
                <li>
                  <button onClick={handleReplay}>{t("replay")}</button>
                </li>
                <li>
                  <button onClick={handleBack}>{t("back")}</button>
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
                  {t("question")} {currentQuestionIndex + 1} {t("of")} {questions.length}
                  </p>
                  {hitChances > 0 && !usedHitChance && (
                    <button className="hit-chance-btn" onClick={useHitChance}>
                      {t("use_hint")} ({hitChances} {t("left")})
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
                    {t("next_question")}
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
