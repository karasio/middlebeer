import React from 'react';
import barService from '../services/bars';

const MyPage = ({user, setPage, bars}) => {
  console.log(user);

  const barsAdded = () => {

  };

  return (
      <div>
        hello {user.name}
        <div>
          bars you have added

        </div>
        <p>bars you have liked</p>
      </div>
  )
};

export default MyPage