import React, {useState} from 'react';

const Bar = ({ bar }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' };
  const showWhenVisible = { display: detailsVisible ? '' : 'none' };

  const barStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    radius: 2,
    borderWidth: 1,
    marginBottom: 5
  };

  const likeBar = (id) => {
    console.log(`bar ${id} liked`);
  };

  return (
      <div style={barStyle}>
        <div style={hideWhenVisible} className='barListItem'>
          <h3 onClick={() => setDetailsVisible(true)}>
            {bar.name} {bar.city}
          </h3>
        </div>
        <div style={showWhenVisible} className='extraInfo'>
          <div onClick={() => setDetailsVisible(false)}>
            <h4>{bar.name}</h4>
            <p>{bar.address}, {bar.city}</p>
            <ul>
              {bar.prices.beer !== undefined ? <li> Beer {bar.prices.beer}€</li> : ''}
              {bar.prices.cider !== undefined ? <li> Cider {bar.prices.cider}€ </li>: ''}
              {bar.prices.longdrink !== undefined ? <li>Long Drink {bar.prices.longdrink}€</li> : ''}
            </ul>
            <p>{bar.likes} likes
              <button onClick={() => likeBar(bar.id)}>like</button></p>
            {/*{ blogUser.name !== undefined ? <p>added by {blogUser.name}</p> : <p>no idea who added this</p> }*/}
          </div>
          {/*{ blogUser.username === user.username ? <button onClick={() => removeBlog(id)}>remove</button> : <></> }*/}
        </div>
      </div>
  );
};

export default Bar