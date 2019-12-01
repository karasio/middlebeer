import React from 'react';
import './menu.css';
import LoginForm from './LoginForm';

const LogoutButton = ({user, username, password, setUser, setPage}) => {
  //console.log(user);
  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
    username.reset();
    password.reset();
    setPage('front');
  };

  return (
      user !== null
          ? <button className='menuBarItem' onClick={handleLogout}>Logout</button>
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
          ? <button className='menuBarItem' onClick={registerButtonClicked}>Sign up</button>
          : ''
  )
};

const MyPageButton = ({ user, setPage }) => {
  const myPageButtonClicked = (event) => {
    event.preventDefault();
    setPage('mypage');
  }

  return (
      user !== null
      ? <button className='menuBarItem' onClick={myPageButtonClicked}>my page</button>
          : ''
  )
};

const Menu = ({user, username, password, setUser, handleLogin, setPage}) => {
  return (
      <div className='menubar'>
        <button onClick={() => setPage('front')} className='menuBarItem'>frontpage</button>
        <LoginForm handleLogin={handleLogin} username={username} password={password} user={user} />
        <RegisterButton className='menuBarItem' setPage={setPage} user={user}/>
        <MyPageButton className='menuBarItem' user={user} setPage={setPage} />
        <LogoutButton className='menuBarItem' user={user} username={username} password={password} setUser={setUser} setPage={setPage}/>
      </div>
  );
};

export default Menu;