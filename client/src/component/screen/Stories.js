import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/Stories.css';

const Stories = () => {
  const [stories, setStories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newStory, setNewStory] = useState({
    name:'',
    feedback:''
  });

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const response = await axios.get('http://localhost:8000/stories/getAll');
      setStories(response.data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/stories/createstories', newStory);
      setNewStory({ name: '', feedback: ''});
      setShowForm(false);
      fetchStories();
    } catch (error) {
      console.error('Error submitting story:', error);
    }
  };

  return (
    <div className="stories-container">
      <button 
        className="write-story-btn"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? 'Close Form' : 'Share Your Story'}
      </button>

      {showForm && (
        <form className="story-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={newStory.author}
            onChange={(e) => setNewStory({...newStory, name: e.target.value})}
            required
          />
          <textarea
            placeholder="Share your experience..."
            value={newStory.feedback}
            onChange={(e) => setNewStory({...newStory, feedback: e.target.value})}
            required
          />
          <button type="submit">Submit Story</button>
        </form>
      )}
      {/* <h1>Customer Stories</h1> */}
      <div className="stories-cloud">
        {stories.map((story, index) => (
          <div 
            key={story._id || index}
            className="story-bubble"
            style={{
              animationDelay: `${index * 0.2}s`,
              transform: `rotate(${Math.random() * 10 - 5}deg)`
            }}
          >
            {/* <h3>{story.title}</h3> */}
            <p>"{story.feedback}"</p>
            <span className="author">- {story.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;

