import React from 'react';

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