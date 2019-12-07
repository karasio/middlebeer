import React, {useState, useEffect} from 'react';
import loginService from './services/login';
import barService from './services/bars';
import userService from './services/users'
import {useField} from './hooks';
import Menu from './components/Menu'
import FrontPage from './components/FrontPage'
import SignUpForm from './components/SignUpForm';
import MyPage from './components/MyPage';

const App = () => {
    const username = useField('text');
    const password = useField('password');
    const [user, setUser] = useState(null);
    const [page, setPage] = useState('front');
    const [bars, setBars] = useState([]);
    const [notification, setNotification] = useState({msg: null, sort: null});

    useEffect(() => {
        barService
            .getAll()
            .then(initialBars => setBars(initialBars));
    }, []);

    useEffect(() => {
        console.log('user muuttui', user);
    }, [user]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedInUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            console.log('localstoragesta kaivettu usr', user);
            setUser(user);
            barService.setToken(user.token);
            userService.setToken(user.token);
        }
        setNotification({msg: null, sort: null});
    }, [page]);

    const handleLogin = async (event) => {
        event.preventDefault();
        // console.log('handleLoginissa username', username);
        // console.log('handleLoginissa password', password);

        try {
            const user = await loginService.login({username: username.object.value, password: password.object.value});
            window.localStorage.setItem(
                'loggedInUser', JSON.stringify(user)
            );
            setUser(user);
            console.log('user set', user);
            barService.setToken(user.token);
            userService.setToken(user.token);
            username.reset();
            password.reset();
            setPage('front')

        } catch (exception) {
            console.log('handleLogin catch', exception);
            //setNotification({ msg: 'wrong credentials', sort: 'error' });
            // setTimeout(() => {
            //   setNotification({ msg: null, sort: null });
            // }, 5000);
        }
    };

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
                        />
                    </>
                );
            case 'mypage':
                return (
                    <>
                        <MyPage
                            user={user}
                            setPage={setPage}
                            bars={bars}
                            setBars={setBars}
                            setNotification={setNotification}
                            notification={notification}
                            setUser={setUser}
                        />
                    </>
                )
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


    return (
        <>
            <div className='DEBUG' style={{display: "none"}}>
              <button onClick={() => {
                setUser(null);
                window.localStorage.clear();
              }}>nollaa käyttäjä</button>
              <button onClick={() => console.log('user on ', user)}>KUKA KÄYTTÄÄ</button>
            </div>

            <Menu user={user}
                  username={username}
                  password={password}
                  setUser={setUser}
                  handleLogin={handleLogin}
                  setPage={setPage}/>
            <div>
                {whichPageToShow()}
            </div>
            <br/><br/>
            <div style={{position: "fixed", bottom: 5, right: 5}}>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </>
    );
};

export default App;

