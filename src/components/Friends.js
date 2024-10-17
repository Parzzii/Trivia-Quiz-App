import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Friends.css";
import Header from "./Header";
import Footer from "./Footer";

function Friends() {
  const navigate = useNavigate();

  const [friends] = useState([
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Hannah",
  ]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  // Group friends alphabetically
  const groupedFriends = friends.reduce((grouped, friend) => {
    const firstLetter = friend[0].toUpperCase();
    if (!grouped[firstLetter]) {
      grouped[firstLetter] = [];
    }
    grouped[firstLetter].push(friend);
    return grouped;
  }, {});

  return (
    <div className="friends-container">
      <Header />
      <main className="friends-list">
        <h1>Friends</h1>
        <nav className="nav-bar">
          <ul className="nav-list">
            <li>
              <button
                className="nav-item"
                onClick={() => handleNavigation("/all-friends")}
              >
                All Friends
              </button>
            </li>
            <li>
              <button
                className="nav-item"
                onClick={() => handleNavigation("/add-friends")}
              >
                Add Friends
              </button>
            </li>
            <li>
              <button
                className="nav-item"
                onClick={() => handleNavigation("/leaderboard")}
              >
                Leaderboard
              </button>
            </li>
            {/* <li>
              <button
                className="nav-item"
                onClick={() => handleNavigation("/notifications")}
              >
                Notifications
              </button>
            </li> */}
          </ul>
        </nav>

        {/* Grouped Friend List */}
        <div className="friend-list-container">
          {Object.keys(groupedFriends).map((letter) => (
            <div key={letter} className="friend-group">
              <h2>{letter}</h2>
              <ul>
                {groupedFriends[letter].map((friend) => (
                  <li key={friend} className="friend-item">
                    {friend}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Friends;
