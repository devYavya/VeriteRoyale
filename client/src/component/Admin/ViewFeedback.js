import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Sidebar from './Sidebar';
import { FaTrash } from 'react-icons/fa';
import '../style/Stories.css';

const ViewFeedback = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await axios.get('https://veriteroyale.onrender.com/stories/getAll');
      setFeedback(response.data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast.error("Error fetching feedback!", { position: "top-left" });
    }
  };

  const deleteFeedback = async (feedbackId) => {
    try {
      await axios.delete(`https://veriteroyale.onrender.com/stories/deleteStory/${feedbackId}`);
      setFeedback(prevFeedback => prevFeedback.filter(item => item._id !== feedbackId));
      toast.success("Feedback deleted successfully!", { position: "top-left" });
    } catch (error) {
      console.error('Error deleting feedback:', error);
      toast.error("Error deleting feedback!", { position: "top-left" });
    }
  };

  return (
    <div className="main">
      <Sidebar />
      <div className="ProductTable">
        <h1>Customer Feedback</h1>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>S.NO.</th>
              <th>Customer Name</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {feedback.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.feedback}</td>
                <td>
                  <button onClick={() => deleteFeedback(item._id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewFeedback;
