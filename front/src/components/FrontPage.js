import React, {useEffect, useState} from 'react';
import barService from '../services/bars';
import Bar from '../components/Bar'

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
  const [bars, setBars] = useState([]);

  useEffect( () => {
    barService
      .getAll()
      .then(initialBars => setBars(initialBars));
  }, []);

  useEffect(() => {
    console.log(bars);
  }, [bars]);

  const allBars = () => {
    console.log('allbarsin',bars, 'typeof', typeof bars);
    bars.map(bar => {
      return (
          <Bar
              name={bar.name}
              city={bar.city}
          />
      )
    })
  };

  console.log('tämäkin tulee frontpagesta');

  return (
      <div>
        tämä tulee frontpagesta
        {allBars()}
        {/*<p>{bars[0].name}</p>*/}
        <LikeButton user={user}/>
      </div>
  );
};

export default FrontPage;