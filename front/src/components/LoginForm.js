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

            <form onSubmit={handleLogin}>
              <input
                  {...username.object}
                  placeholder={'username'}
              />
              <input {...password.object}
                     placeholder={'password'}
              />
              <button type='submit'>login</button>
            </form>
          </div>
          : ''
  );
};

export default LoginForm;