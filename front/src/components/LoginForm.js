import React from 'react';

/**
 * Handles login input
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
  // console.log(username);
  // console.log(password);
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
              <button id='menuLoginButton'
                  type='submit'>Login</button>
            </form>
          : ''
  );
};

export default LoginForm;