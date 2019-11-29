import React from 'react';

const LoginForm = ({
                     handleLogin,
                     username,
                     password,
                     user,
                   }) => {
  console.log(username);
  console.log(password);
  return (
      user === null
          ? <div>

            <form  onSubmit={handleLogin}>
              <input
                  className='menuBarItem'
                  {...username.object}
                  placeholder={'username'}
              />
              <input
                  {...password.object}
                  placeholder={'password'}
                  className='menuBarItem'
              />
              <button
                  className='menuBarItem'
                  type='submit'>login</button>
            </form>
          </div>
          : ''
  );
};

export default LoginForm;