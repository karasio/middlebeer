import React, {useEffect, useState} from 'react';
import '../components/MyPage.css'
import userService from '../services/users';
import Bar from './Bar';
import AddBar from './AddBar';

const MyPage = ({user, setPage, bars, setBars, setNotification, notification, setUser}) => {
  //console.log(user);
  // const [userBars, setUserBars] = useState([]);
  //
  // const allUsers = userService
  //   .getAll()
  //     .then((response) => {
  //   const userId = response.filter(u => u.username === user.username);
  //   setUserBars(userId.bars);
  // });

  // const getBarsAdded = async () => {
  //   const allUsers = await userService.getAll();
  //   const userId = allUsers.filter(u => u.username === user.username);
  //   //console.log('userId',userId, 'raflat');
  //   setUserBars(userId.bars);
  // };

  const [city, setCity] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('def city', user.defaultCity);
    user.defaultCity ? setCity(user.defaultCity) : setCity('');
  }, [user.defaultCity]);

  useEffect(() => {
    userService
    .getAll()
    .then((response) => {
      console.log('käyttäjät on ',response);
      setUsers(response)
    });
  }, []);

  const usersBars = bars.filter(bar => bar.user.username === user.username);
  const uniqueTowns = bars.map(bar => bar.city).reduce((unique, item) => {
    return unique.includes(item) ? unique : [...unique, item]
  }, []);

  const barsAdded = () =>
    usersBars.map(bar => {
      return (
          <Bar
              key={bar.id}
              bar={bar}
              user={user}
              setBars={setBars}
              bars={bars}
              setNotification={setNotification}
              notification={notification}
          />
      )
    });

  const handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setCity(e.target.value);
  };

  const saveDefaultCity = async (e) => {
    e.preventDefault();

    const modifiedUser = users.find(u => u.username === user.username);
    console.log('find user', modifiedUser);

    //debugger;
    modifiedUser.defaultCity = city;
    modifiedUser.token = user.token;

    //console.log('täät',modifiedUser);
    userService
        .update(modifiedUser.id, modifiedUser)
        .then(response => {
          console.log('TÄMÄ ON PALVELIMEN RESPONSE, JOKA SETUSER(RESPONSE)',response);
          setUser(response);
          window.localStorage.setItem(
          'loggedInUser', JSON.stringify(response)
      );
    })
  };


  return (
      <div className='contentWrapper'>
          <h1>Hello {user.name}!</h1>
        <div>
          <h2 >Add new bar</h2>
          <AddBar user={user} setBars={setBars}/>
          <h2>Here is some information about your activity:</h2>
          <p>Bars added by you</p>
          {barsAdded()}
          {/*<p>bars you have liked</p>*/}
          <h2>Settings</h2>
          {city !== '' ? <p>Default city: {city}</p> : ''}
          <select name='cityOption' onChange={handleClick} value={city}>
            {uniqueTowns.map(town => {
              return (
                  <option key={town}>{town}</option>
              )
            })}
          </select>
            <button onClick={saveDefaultCity}>set as default</button>
        </div>
      </div>
  );
};

export default MyPage