import React, { useState } from 'react';
import AuthForm from '../components/AuthForm';

const AuthPage = ({ onLoginSuccess }) => {
  const [formType, setFormType] = useState('login'); // 'login' or 'signup'

  const handleSubmit = ({ email, password }) => {
    // In a real application, you'd send this data to your backend for authentication.
    console.log(`Submitting ${formType} for:`, { email, password });

    // Simulate a successful login
    if (formType === 'login' && email === 'test@example.com' && password === 'password') {
      alert('Login Successful!');
      onLoginSuccess(); // Call the prop to update authentication status in App.jsx
    } else if (formType === 'signup') {
      alert('Signup Successful! Please log in.');
      setFormType('login'); // After signup, prompt user to login
    } else {
      alert('Invalid credentials or an error occurred.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <AuthForm
        formType={formType}
        onSubmit={handleSubmit}
        onSwitchForm={setFormType}
      />
    </div>
  );
};

export default AuthPage;