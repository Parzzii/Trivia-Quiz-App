import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import ChooseTopic from "./components/ChooseTopic";
import QuestionPage from "./components/QuestionPage";
import Languages from "./components/Languages";
import Support from "./components/Support";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Random from "./components/Random";
import FetchQuestions from "./components/fetchQuestions";
import Leaderboard from "./components/Leaderboard";
import AddFriends from "./components/AddFriends";
import Game from "./components/Game"; // Import the Game component

// Protected route component for checking authentication
function ProtectedRoute({ element, ...rest }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return element;
}

function App() {
  const [refresh, setRefresh] = useState(false);

  // Toggle the refresh state to trigger a leaderboard update
  const refreshLeaderboard = () => {
    setRefresh(!refresh);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected Routes */}
          <Route path="/choose-topic" element={<ProtectedRoute element={<ChooseTopic />} />} />
          <Route path="/question-page" element={<ProtectedRoute element={<QuestionPage />} />} />
          <Route path="/random" element={<ProtectedRoute element={<Random />} />} />
          <Route path="/fetch-questions/:topicId/:difficulty" element={<ProtectedRoute element={<FetchQuestions />} />} />
          <Route path="/add-friends" element={<ProtectedRoute element={<AddFriends />} />} />

          {/* Game Route with Score Submission */}
          <Route path="/game" element={<ProtectedRoute element={<Game onScoreSubmit={refreshLeaderboard} />} />} />

          {/* Leaderboard Route with Refresh Prop */}
          <Route path="/leaderboard" element={<ProtectedRoute element={<Leaderboard refresh={refresh} />} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
