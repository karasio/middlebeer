import React, { useState, useEffect } from 'react';
import './styles/App.css';
import loginService from './services/login';
import barService from './services/bars';
import userService from './services/users';
import { useField } from './hooks';
import Menu from './components/Menu';
import FrontPage from './components/FrontPage';
import SignUpForm from './components/SignUpForm';
import MyPage from './components/MyPage';
import anecdoteList from './utils/anecdotes';

const App = () => {
  const username = useField('text');
  const password = useField('password');
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('front');
  const [bars, setBars] = useState([]);
  const [notification, setNotification] = useState({ msg: null, sort: null });
  const [anecdoteString, setAnecdoteString] = useState('');

  useEffect(() => {
    barService
      .getAll()
      .then(initialBars => setBars(initialBars));

    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      // console.log('localstoragesta kaivettu usr', user);
      setUser(user);
      barService.setToken(user.token);
      userService.setToken(user.token);
    }
    setNotification({ msg: null, sort: null });

  }, []);

  // useEffect(() => {
  //     console.log('user muuttui', user);
  // }, [user]);

  useEffect(() => {
    setNotification({ msg: null, sort: null });

    const rnd = Math.floor(Math.random() * anecdoteList.anecdotes.length);
    const aString =
            <div className='anecdote'>
              <blockquote>
                <p>&quot;{anecdoteList.anecdotes[rnd].text}&quot;</p>
                <p className='anecdoteBy'>{anecdoteList.anecdotes[rnd].by}</p>
              </blockquote>
            </div>;
    setAnecdoteString(aString);
  }, [page]);

  useEffect(() => {

  }, []);

  /**
     * Event handler responsible for login.
     * Logs user in with a server connection to database
     * Sets user to local storage
     * @param event
     * @returns {Promise<void>}
     */
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username: username.object.value, password: password.object.value });
      // console.log('loginin jälkeen', user);
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      );
      setUser(user);
      barService.setToken(user.token);
      userService.setToken(user.token);
      username.reset();
      password.reset();
      setPage('front');

    } catch (exception) {
      window.alert('Invalid username or password');
      //setNotification({ msg: 'wrong credentials', sort: 'error' });
      // setTimeout(() => {
      //   setNotification({ msg: null, sort: null });
      // }, 5000);
    }
  };

  /**
     * Conditional rendering & page navigation
     * @returns {*}
     */
  const whichPageToShow = () => {
    switch (page) {
    case 'front':
      return (
        <div>
          <FrontPage
            user={user}
            bars={bars}
            setBars={setBars}
            notification={notification}
            setNotification={setNotification}
          />
        </div>
      );
    case 'signup':
      return (
        <>
          <SignUpForm
            setPage={setPage}
            notification={notification}
            setNotification={setNotification}
            setUser={setUser}
          />
        </>
      );
    case 'mypage':
      return (
        <>
          <MyPage
            user={user}
            bars={bars}
            setBars={setBars}
            setNotification={setNotification}
            notification={notification}
            setUser={setUser}
          />
        </>
      );
    default:
      return (
        <div>
          <FrontPage
            user={user}
            bars={bars}
            setBars={setBars}
            notification={notification}
            setNotification={setNotification}
          />
        </div>
      );
    }
  };

  /**
     * component to render random anecdote
     * @returns {*}
     */
  const RandomAnecdote = () => {
    return anecdoteString;
  };


  return (
    <>
      <div className='DEBUG' style={{ display: 'none' }}>
        <button onClick={() => {
          setUser(null);
          window.localStorage.clear();
        }}>nollaa käyttäjä
        </button>
        <button onClick={() => console.log('user on ', user)}>KUKA KÄYTTÄÄ</button>
      </div>

      <Menu user={user}
        username={username}
        password={password}
        setUser={setUser}
        handleLogin={handleLogin}
        setPage={setPage}/>
      <div className='contentWrapper'>
        {page === 'front' ? <RandomAnecdote/> : <></>}
        {whichPageToShow()}
        <br/><br/>
      </div>
    </>
  );
};

export default App;

