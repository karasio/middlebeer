import React from 'react';

const LikeButton = ({user}) => {
  const likeButtonClicked = (e) => {
    // 5ddf9cb4e700454635403c47
    console.log('kiitti tykkäyksestä');
  };

  return (
      <button onClick={likeButtonClicked}>LIKE</button>
  );
};

const FrontPage = ({user}) => {
  console.log('tämäkin tulee frontpagesta');
  return (
      <div>
        tämä tulee frontpagesta
        <LikeButton user={user}/>
      </div>
  );
};

export default FrontPage;