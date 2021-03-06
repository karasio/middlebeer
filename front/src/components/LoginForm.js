import React from 'react';

/**
 * Component for Login Form
 * @param handleLogin Function that is called when user tries to log in
 * @param username Username input value
 * @param password Password input value
 * @param user User that is logged in.
 */
const LoginForm = ({
  handleLogin,
  username,
  password,
  user,
}) => {
  return (
    user === null
      ?
      <form className='menuBarItem' id='menuLoginForm' onSubmit={handleLogin}>
        <input
          {...username.object}
          placeholder={'username'}
        />
        <input
          {...password.object}
          placeholder={'password'}

        />
        <button className='clickable' id='menuLoginButton'
          type='submit'>Login
        </button>
      </form>
      : ''
  );
};

export default LoginForm;