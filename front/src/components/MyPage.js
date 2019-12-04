import React, {useState} from 'react';
import '../components/MyPage.css'
import userService from '../services/users';
import Bar from './Bar';

const MyPage = ({user, setPage, bars, setBars, setNotification, notification}) => {
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

  const usersBars = bars.filter(bar => bar.user.username === user.username);
  console.log('käyttäjän baarit', usersBars);


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


  return (
      <div className='contentWrapper'>
          <h1>Hello {user.name}!</h1>
        <div>
          <h2>Here is some information about your activity:</h2>
          <p>bars you have added</p>
          {barsAdded()}
          {/*<p>bars you have liked</p>*/}
        </div>
      </div>
  )
};

export default MyPage