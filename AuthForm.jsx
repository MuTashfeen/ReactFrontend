import React, { useState } from 'react';
import InputField from './InputField';
import Button from './Button';

const AuthForm = ({ formType, onSubmit, onSwitchForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  const isLogin = formType === 'login';

  return (
    <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-xl">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? 'Sign in to continue.' : 'Get started with Smart Career Coach.'}
        </p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <InputField
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          id="password"
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
      </form>
      <div className="text-sm text-center">
        {isLogin ? (
          <p>
            Don't have an account?{' '}
            <button
              onClick={() => onSwitchForm('signup')}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              Sign Up
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <button
              onClick={() => onSwitchForm('login')}
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
            >
              Sign In
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthForm;