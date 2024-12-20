"use client"
import axios from 'axios';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const FeedbackForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/feedback', formData);
      alert('Feedback submitted successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      alert(`Error submitting feedback: ${error.message}`);
    }
  };

  return (
    <div className='flex justify-center items-center w-screen h-screen bg-blue-100'>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md space-y-4 h-fit">
        <h2 className="text-2xl font-bold text-center text-gray-700">Submit Feedback</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <textarea
          name="message"
          placeholder="Your Feedback"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 border border-gray-300 min-h-20 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          rows={4}
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
