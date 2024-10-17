import React, { useState } from "react";
import './AddFriends.css';
import Header from "./Header";
import Footer from "./Footer";



const mockFriends = [
  { id: 1, name: 'Bob Johnson' },
  { id: 2, name: 'Sofia Lopez' },
  { id: 3, name: 'Jack Smith' },
  { id: 4, name: 'Olivia Jones' },
  { id: 5, name: 'Eva Martinez' },
  { id: 6, name: 'Emma Davis' },
];

const AddFriends = () => {
  const [friends] = useState(mockFriends);
  const [searchTerm] = useState('');
  const [addedFriends, setAddedFriends] = useState([]);


  const handleAddFriend = (friendId) => {
    setAddedFriends([...addedFriends, friendId]);
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="add-friends-page">
            <Header />


      <div className="tabs">
        <button className="tab">All friends</button>
        <button className="tab active">Add friends</button>
        <button className="tab">Leaderboard</button>
      </div>

      

      <div className="friend-list">
        {filteredFriends.map((friend) => (
          <div key={friend.id} className="friends-item">
            <span>{friend.name}</span>
            <button
              className="add-btn"
              onClick={() => handleAddFriend(friend.id)}
              disabled={addedFriends.includes(friend.id)}
            >
              {addedFriends.includes(friend.id) ? 'Added' : 'Add'}
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default AddFriends;




