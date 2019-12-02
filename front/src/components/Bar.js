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
  const [beer, setBeer] = useState(bar.prices.beer === undefined ? 0.00 : bar.prices.beer);
  const [cider, setCider] = useState(bar.prices.cider === undefined ? 0.00 : bar.prices.cider);
  const [longdrink, setLongdrink] = useState(bar.prices.longdrink === undefined ? 0.00 :  bar.prices.longdrink);

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
    console.log('beer', typeof(beer), 'cider', typeof(cider), 'longk', typeof(longdrink));

    // TODO saisko if-elseif-elsestä jotenkin funktion?
    //  tempCider toimii nyt (testattu, ettei 0 / tyhjä string / kissa mee kantaan

    let tempCider;
    if(!isNaN(Number.parseFloat(cider)) && Number.parseFloat(cider) !== 0) {
      console.log('kaikki pitäs olla ok?');
      tempCider = Number.parseFloat(cider);
    } else if ((cider === null || isNaN(cider) || cider === '' || cider === 0) && !bar.prices.cider) {
      console.log('ei kelpo numero, ei vanhaa dataa');
      console.log('siideri on nan tai null:', cider);
      console.log('kannasta', bar.prices.cider);
      setCider(undefined);
    } else if (bar.prices.cider) {
      console.log('vanhassa datassa hinta, mutta uus huttua');
      tempCider = bar.prices.cider;
    }


    const edited = {
      name: bar.name,
      address: bar.address,
      city: bar.city,
      likes: bar.likes,
      user: user,
      id: bar.id,
      prices: {
        beer: (beer === 0.00 || beer === '') ? bar.prices.beer : Number.parseFloat(beer),
        cider: tempCider,
        longdrink: (longdrink === 0.00 || beer === '') ? bar.prices.longdrink : Number.parseFloat(longdrink)
      }
    };
    console.log(bar.id, edited.prices);

    //debugger;
    barService
        .update(id, edited)
        .then(returnedBars => setBars(returnedBars));

  };

  const handleBeerChange = (e) => {
    console.log('typeof e.target.value', typeof(e.target.value));
    setBeer(e.target.value);
  };

  const handleCiderChange = (e) => {
    console.log('typeof e.target.value', typeof(e.target.value));
    setCider(e.target.value);
  };

  const handleLongdrinkChange = (e) => {
    console.log('typeof e.target.value', typeof(e.target.value));
    setLongdrink(e.target.value);
  };

  return (
      <div>
        <div style={hideWhenVisible} className='barListItem'>
          <h4 onClick={() => setDetailsVisible(true)}>
            {bar.name} {bar.city}
          </h4>
        </div>
        <div style={showWhenVisible} className='extraInfo'>
          <div>
            <h3 onClick={() => setDetailsVisible(false)}>{bar.name}</h3>
            <p>{bar.address}, {bar.city}</p>
            <p>{bar.likes} likes
              <button onClick={() => likeBar(bar.id)}>like</button>
              <button onClick={() => setEditVisible(true)}>edit</button>
            </p>
            <ul style={showDefault}>
              {(bar.prices.beer === undefined || bar.prices.beer === null) ? '' : <li> Beer {bar.prices.beer.toFixed(2)}€</li>}
              {(bar.prices.cider === undefined || bar.prices.cider === null) ? '' : <li> Cider {bar.prices.cider.toFixed(2)}€ </li>}
              {(bar.prices.longdrink === undefined || bar.prices.longdrink === null) ? '' : <li>Long Drink {bar.prices.longdrink.toFixed(2)}€</li> }
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
                <button onClick={() => setEditVisible(false)}>cancel</button>
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