import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import ChooseTopic from "./components/ChooseTopic";
import QuestionPage from "./components/QuestionPage";
import Languages from "./components/Languages"; // Uncomment if using Languages component
import Support from "./components/Support";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Register from "./components/Register";
import Friends from "./components/Friends";
import Random from "./components/Random"; // Corrected import statement
import FetchQuestions from "./components/fetchQuestions"; // Adjusted import case
// import AllFriends from "./components/AllFriends";
// import AddFriends from "./components/AddFriends";
import Leaderboard from "./components/Leaderboard"; // Import Leaderboard component
// import Notifications from "./components/Notifications"; // Import Notifications component


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/choose-topic" element={<ChooseTopic />} />
          <Route path="/question-page" element={<QuestionPage />} />
          <Route path="/languages" element={<Languages />} />
          <Route path="/support" element={<Support />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/random" element={<Random />} />
          <Route path="/friends" element={<Friends />} />
          {/* <Route path="/all-friends" element={<AllFriends />} /> */}
          {/* <Route path="/add-friends" element={<AddFriends />} /> */}
          <Route path="/leaderboard" element={<Leaderboard />} /> {/* Path to leaderboard */}
          {/* <Route path="/notifications" element={<Notifications />} /> */}
          

          {/* New Route for FetchQuestions */}
          <Route path="/fetch-questions/:topicId/:difficulty" element={<FetchQuestions />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
