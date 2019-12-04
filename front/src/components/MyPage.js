import React from 'react';
import '../components/MyPage.css'
import barService from '../services/bars';

const MyPage = ({user, setPage, bars}) => {
  console.log(user);

  const barsAdded = () => {

  };

  return (
      <div className='contentWrapper'>
          <h1>Hello {user.name}!</h1>
        <div>
            <h2>Here is some information about your activity:</h2>
            <p>bars you have added</p>

        <p>bars you have liked</p>
        </div>
      </div>
  )
};

export default MyPage