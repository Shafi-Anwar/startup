"use client";
import { useState } from 'react';
import emailjs from 'emailjs-com';
import SuccessNotification from '../components/SuccessNotification'; // Ensure this path is correct
import { useRouter } from 'next/navigation';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_0rqwbrn', 'template_u1ks0uc', e.target, '8UHlL265a6cO4PJpd')
      .then((result) => {
        setStatus('Email sent successfully!');
        setEmail('');
        setSubject('');
        setMessage('');
        setTimeout(() => {
          setStatus('');
          router.push('/'); // Redirect to home page
        }, 3000); // Hide notification and redirect after 3 seconds
      }, (error) => {
        setStatus(`Failed to send email: ${error.text}`);
        setTimeout(() => setStatus(''), 3000); // Hide notification after 3 seconds
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md p-6 bg-white text-black shadow-lg rounded-lg border border-gray-300 
          transition-transform transform-gpu hover:scale-105 hover:shadow-xl 
          md:max-w-lg md:p-8 md:space-y-6"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800 md:text-3xl md:mb-6">Contact Us</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows="4"
            className="block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
        >
          Send Email
        </button>
        {status && <SuccessNotification message={status} />}
      </form>
    </div>
  );
};

export default ContactForm;
