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
              Login username
              <input
                  {...username.object}
              />
              password
              <input {...password.object}
              />
              <button type='submit'>login</button>
            </form>
          </div>
          : ''
  );
};

export default LoginForm;