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
  );
};

export default LoginForm;