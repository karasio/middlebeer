import React, {useState} from 'react';
import barService from '../services/bars';
import '../components/FrontPage.css'

const Bar = ({ bar, setBars, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' };
  const showWhenVisible = { display: detailsVisible ? '' : 'none' };
  const [editVisible, setEditVisible] = useState(false);
  const showDefault = {display: editVisible ? 'none' : ''};
  const showEdit = { display: editVisible ? '' : 'none'};
  const [beer, setBeer] = useState(bar.prices.beer !== undefined ? bar.prices.beer : 0.00);
  const [cider, setCider] = useState(bar.prices.cider !== undefined ? bar.prices.cider : 0.00);
  const [longdrink, setLongdrink] = useState(bar.prices.longdrink !== undefined ? bar.prices.longdrink : 0.00);

  const barStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5
  };

  const likeBar = (id) => {
    console.log(`bar ${id} liked`);
    const newBar = {
      name: bar.name,
      address: bar.address,
      city: bar.city,
      prices: bar.prices,
      likes: bar.likes+1,
      user: user,
      id: bar.id
    };
    //console.log('newBar',newBar);
    barService
        .update(id, newBar)
        .then(returnedBars => setBars(returnedBars));
  };


  const savePrices = (id) => {
    const edited = {
      name: bar.name,
      address: bar.address,
      city: bar.city,
      likes: bar.likes,
      user: user,
      id: bar.id,
      prices: {
        beer: beer === 0.00 || '' ? bar.prices.beer : parseFloat(beer),
        cider: cider === 0.00 || '' ? bar.prices.cider : parseFloat(cider),
        longdrink: longdrink === 0.00 || '' ? bar.prices.longdrink : parseFloat(longdrink)
      }
    };
    console.log(bar.id, edited);

    barService
        .update(id, edited)
        .then(returnedBars => setBars(returnedBars));

  };

  const handleBeerChange = (e) => {
    console.log('typeof e.target.value', typeof(e.target.value));
    setBeer(e.target.value);
  };

  const handleCiderChange = (e) => {
    setCider(e.target.value);
  };

  const handleLongdrinkChange = (e) => {
    setLongdrink(e.target.value);
  };

  return (
      <div style={barStyle}>
        <div style={hideWhenVisible} className='barListItem'>
          <h3 onClick={() => setDetailsVisible(true)}>
            {bar.name} {bar.city}
          </h3>
        </div>
        <div style={showWhenVisible} className='extraInfo'>
          <div>
            <h4 onClick={() => setDetailsVisible(false)}>{bar.name}</h4>
            <p>{bar.address}, {bar.city}</p>
            <p>{bar.likes} likes
              <button onClick={() => likeBar(bar.id)}>like</button>
              <button onClick={() => setEditVisible(true)}>edit</button>
            </p>
            <ul style={showDefault}>
              {bar.prices.beer !== undefined ? <li> Beer {bar.prices.beer.toFixed(2)}€</li> : ''}
              {bar.prices.cider !== undefined ? <li> Cider {bar.prices.cider.toFixed(2)}€ </li>: ''}
              {bar.prices.longdrink !== undefined ? <li>Long Drink {bar.prices.longdrink.toFixed(2)}€</li> : ''}
            </ul>
            <ul style={showEdit}>
              <form onSubmit={() => savePrices(bar.id)}>
                <li>Beer
                  <input
                      value={beer}
                      onChange={handleBeerChange}
                  />
                </li>
                <li> Cider
                  <input
                      value={cider}
                      onChange={handleCiderChange}
                  />
                </li>
                <li> Long drink
                  <input
                      value={longdrink}
                      onChange={handleLongdrinkChange}
                  />
                </li>
                <button type='submit'>save</button>
              </form>
            </ul>

            {/*{ blogUser.name !== undefined ? <p>added by {blogUser.name}</p> : <p>no idea who added this</p> }*/}
          </div>
          {/*{ blogUser.username === user.username ? <button onClick={() => removeBlog(id)}>remove</button> : <></> }*/}
        </div>
      </div>
  );
};

export default Bar