import React, { useState, useEffect } from 'react';
import loginService from './services/login';
import barService from './services/bars';
import { useField } from './hooks';
import LoginForm from './components/LoginForm';
import Menu from './components/Menu'
import FrontPage from './components/FrontPage'

const App = () => {
  const username = useField('text');
  const password = useField('password');
  const name = useField('text');
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('front');

  useEffect(() => {
    console.log('user muuttui', user);
  }, [user]);

  useEffect(() => {

    const loggedUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      barService.setToken(user.token);
    }
  },[]);

  const handleLogin = async (event) => {
    event.preventDefault();
    // console.log('handleLoginissa username', username);
    // console.log('handleLoginissa password', password);

    try {
      const user = await loginService.login({ username: username.object.value, password: password.object.value });
      window.localStorage.setItem(
          'loggedInUser', JSON.stringify(user)
      );
      setUser(user);
      console.log('user set',user);
      barService.setToken(user.token);
      username.reset();
      password.reset();

    } catch (exception) {
      console.log('handleLogin catch',exception);
      //setNotification({ msg: 'wrong credentials', sort: 'error' });
      // setTimeout(() => {
      //   setNotification({ msg: null, sort: null });
      // }, 5000);
    }
  };


  //


  const loginForm = () => (
      <div>
        {registerView()}
        <h3>log in to application</h3>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input {...username.object}/>
          </div>
          <div>
            password
            <input {...password.object}/>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
  );

  const registerView = () => (
      <div>
        <h3>sign up for application</h3>
        <button onClick={registerButtonClicked}>Sign up</button>
      </div>
  );

  const registerButtonClicked = (event) => {
    event.preventDefault();

    return (
        <div>
          <h3>welcome new user!</h3>
          <form onSubmit={handleRegister}>
            <div>
              name
              <input {...name.object} />
            </div>
            <div>
              username
              <input {...username.object} />
            </div>
            <div>
              password
              <input {...password.object} />
            </div>
            <button type='submit'>sign up</button>
          </form>
        </div>
    )
  };

  const whichPageToShow = () => {
    switch (page) {
      case 'front':
        return (
            <div>
            <FrontPage
                user={user}
            />
            </div>
        );
      default:
        return (
            <div>
            <FrontPage/>
            </div>
        );
    }
  };

  const handleRegister =  async (event) => {
    console.log('jottain rekisteröintihommii pitäs');
  };

  // const loggedInView = () => (
  //
  //     <div>
  //       <Menu />
  //       upea keskikaljasivu
  //       <div>
  //         { user.name } is logged in { user !== null && logoutButton() }
  //       </div>
  //     </div>
  // );

  return (
      <>
        <button onClick={() => console.log('user on ', user)}>KUKA KÄYTTÄÄ</button>
        <button onClick={() => {
          setUser(null)
          window.localStorage.clear();
        }}>nollaa käyttäjä</button>

        <Menu user={user}
              username={username}
              password={password}
              setUser={setUser} />
        <div>
        {whichPageToShow()}
        </div>
        {loginForm()}
      </>
  );
};

export default App;

//{/*<button onClick={() => console.log('blogsissa', blogs)}>LOGGAA BLOGI</button>*/}
// {user === null ? loginForm() : loggedInView()}
