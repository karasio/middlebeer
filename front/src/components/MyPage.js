import React, {useEffect, useState} from 'react';
import '../styles/MyPage.css'
import userService from '../services/users';
import Bar from './Bar';
import AddBar from './AddBar';
import Notification from './Notification';

/**
 * Component for rendering users own page.
 * @param user - user that is logged in
 * @param bars - list of bars
 * @param setBars - to alter list of bars
 * @param setNotification - to alter notification object
 * @param notification - notification object
 * @param setUser - used to set user if changes to user are made
 * @returns {*}
 */

const MyPage = ({user, bars, setBars, setNotification, notification, setUser}) => {
  const [city, setCity] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log('def city', user.defaultCity);
  }, [user.defaultCity]);

  useEffect(() => {
    userService
    .getAll()
    .then((response) => {
      //console.log('käyttäjät on ',response);
      setUsers(response)
    });
    user.defaultCity ? setCity(user.defaultCity) : setCity('');
    setNotification({msg: null, sort: null});
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

  /**
   * Event handler for changing users default city
   * Makes api call to change user information on database and sets user to useState variable
   */
  const saveDefaultCity = async (e) => {
    e.preventDefault();

    const modifiedUser = users.find(u => u.username === user.username);
    console.log('find user', modifiedUser);

    //debugger;
    city === 'None' ? modifiedUser.defaultCity = undefined : modifiedUser.defaultCity = city;
    modifiedUser.token = user.token;

    console.log('täät',modifiedUser);
    // debugger;
    userService
        .update(modifiedUser.id, modifiedUser)
        .then(response => {
          console.log('TÄMÄ ON PALVELIMEN RESPONSE, JOKA SETUSER(RESPONSE)',response);
          setUser(modifiedUser);
          window.localStorage.setItem(
          'loggedInUser', JSON.stringify(modifiedUser)
      );
    })
  };

  /**
   * Forms string to first upper case letter, rest lower case letter
   * @returns formalized string
   */
  const capitalize = (value) => {
    return value.toLowerCase()
    .split(/ /)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
  };

  return (
      <div className='contentWrapper'>
          <h1>Hello {capitalize(user.name)}!</h1>
          <Notification message={notification} />
        <div>
          <h2 >Add new bar</h2>
          <AddBar user={user} setBars={setBars} setNotification={setNotification}/>
          <h2>Here is some information about your activity:</h2>
          <p>Bars added by you</p>
          {barsAdded()}
          {/*<p>bars you have liked</p>*/}
          <h2>Settings</h2>
          {city !== '' ? <p>Default city: {city}</p> : ''}
          <select name='cityOption' onChange={handleClick} value={city}>
            <option key={'none'}>--None--</option>
            {uniqueTowns.map(town => {
              return (
                  <option key={town}>{town}</option>
              )
            })}
          </select>
            <button className='inContentButton clickable' onClick={saveDefaultCity} style={{width: '100px'}}>set as default</button>
        </div>
      </div>
  );
};

export default MyPage