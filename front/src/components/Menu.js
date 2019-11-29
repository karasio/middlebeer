import React from 'react';
import './menu.css';
import LoginForm from './LoginForm';

const LogoutButton = ({user, username, password, setUser}) => {
  console.log(user);
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
    username.reset();
    password.reset();
  };


  return (
      user !== null
          ? <button onClick={handleLogout}>Logout</button>
          : ''
  )
};

const RegisterButton = ({ setPage, user }) => {
  const registerButtonClicked = (event) => {
    event.preventDefault();
    setPage('signup')
  };

  return (
      user === null
          ? <button onClick={registerButtonClicked}>Sign up</button>
          : ''
  )
}

const Menu = ({user, username, password, setUser, handleLogin, setPage}) => {
  return (
      <div className='menubar'>
        <LoginForm handleLogin={handleLogin} username={username} password={password} user={user} />
        <RegisterButton setPage={setPage} user={user}/>
        <LogoutButton user={user} username={username} password={password} setUser={setUser}/>
      </div>
  );
};

export default Menu;