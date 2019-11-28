import React from 'react';

const LoginForm = ({
                     handleLogin,
                     username,
                     password
                   }) => {
  console.log(username);
  console.log(password);
  return (
      <div>
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
                {...username.object}
            />
          </div>
          <div>
            password
            <input {...password.object}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
  );
};

export default LoginForm;