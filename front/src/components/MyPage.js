import React from 'react';

const MyPage = ({user, setPage}) => {
  console.log(user);
  return (
      <div>
        hello {user.name}
        <p>bars you have added</p> <p>bars you have liked</p>
      </div>
  )
};

export default MyPage