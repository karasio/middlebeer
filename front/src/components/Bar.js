import React, {useState} from 'react';
import barService from '../services/bars';
import '../components/FrontPage.css'

const Bar = ({ bar, bars, setBars, user, setNotification }) => {
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

  const editBar = async (id) => {
    //console.log('beer', typeof(beer), 'cider', typeof(cider), 'longk', typeof(longdrink));

    const figureOutPrice = (userInput, priceFromDb) => {
      if(!isNaN(Number.parseFloat(userInput)) && Number.parseFloat(userInput) !== 0) {
        console.log('kaikki pitäs olla ok?');
        return Number.parseFloat(userInput);
      } else if ((userInput === null || isNaN(userInput) || userInput === '' || userInput === 0) && !priceFromDb) {
        setNotification({msg: 'Invalid input', sort: 'error'});
        setTimeout(() => {
          setNotification({msg: null, sort: null})
        }, 10000);
        console.log('ei kelpo numero, ei vanhaa dataa');
        console.log('siideri on nan tai null:', userInput);
        console.log('kannasta', priceFromDb);
        return undefined;
      } else if (priceFromDb) {
        setNotification({msg: 'Invalid input', sort: 'error'});
        setTimeout(() => {
          setNotification({msg: null, sort: null})
        }, 10000);
        console.log('vanhassa datassa hinta, mutta uus huttua');
        return priceFromDb;
      }
    }

    const edited = {
      name: bar.name,
      address: bar.address,
      city: bar.city,
      likes: bar.likes,
      user: user,
      id: bar.id,
      prices: {
        beer: figureOutPrice(beer, bar.prices.beer),
        cider: figureOutPrice(cider, bar.prices.cider),
        longdrink: figureOutPrice(longdrink, bar.prices.longdrink)
      }
    };
    console.log(bar.id, edited.prices);

    //debugger;
    const returnedBars = await barService.update(id, edited);
    // setNotification({msg: 'tööt', sort: 'error'});
    // debugger;
    // setTimeout(() => {
    //   setNotification({msg: null, sort: null});
    // }, 5000);
    setBars(returnedBars);

  };

  const removeBar = (id) => {
    const barToRemove = bars.find(b => b.id === id);
    const sureToDelete = window.confirm(`Delete ${barToRemove.name}?`);

    if(sureToDelete) {
      barService
      .remove(id)
      .then(() => {
        setNotification({ msg: `${barToRemove.name} was removed`, sort: 'info' });
        setTimeout(() => {
          setNotification({ msg: null, sort: null });
        }, 5000);
        barService
        .getAll()
        .then(freshBars => setBars(freshBars));
      })
      .catch(error => {
        console.log('Virhe removessa', error.response.data.error);
        setNotification({ msg: error.response.data.error, sort: 'error' });
        setTimeout(() => {
          setNotification({ msg: null, sort: null });
        }, 5000);
      });
    }
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
      <>
        <div style={hideWhenVisible} className='barListItem'>
          <h4 className='clickable' onClick={() => setDetailsVisible(true)}>
            {bar.name} {bar.city}
          </h4>
        </div>
        <div style={showWhenVisible} className='extraInfo'>
            <h3 className='clickable' onClick={() => setDetailsVisible(false)}>{bar.name}</h3>
            <p>{bar.address}, {bar.city}</p>
            <p>{bar.likes} likes
              {user !== null ?
                  <button className='clickable' onClick={() => likeBar(bar.id)}>like</button>
              : ''}
              {user !== null ?
                  <button className='clickable' onClick={() => setEditVisible(true)}>edit</button>
                  : ''
              }
            </p>
            <ul style={showDefault}>
              {(bar.prices.beer === undefined || bar.prices.beer === null) ? '' : <li> Beer {bar.prices.beer.toFixed(2)}€</li>}
              {(bar.prices.cider === undefined || bar.prices.cider === null) ? '' : <li> Cider {bar.prices.cider.toFixed(2)}€ </li>}
              {(bar.prices.longdrink === undefined || bar.prices.longdrink === null) ? '' : <li>Long Drink {bar.prices.longdrink.toFixed(2)}€</li> }
            </ul>
            {user !== null ?
                <ul style={showEdit}>
                  <form onSubmit={() => editBar(bar.id)}>
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
                    <button className='clickable' type='submit'>save</button>
                    <button onClick={() => setEditVisible(false)}>cancel</button>
                  </form>
                </ul>
                : ''}

            {/*{ blogUser.name !== undefined ? <p>added by {blogUser.name}</p> : <p>no idea who added this</p> }*/}
          {/*{ blogUser.username === user.username ? <button onClick={() => removeBlog(id)}>remove</button> : <></> }*/}
        </div>
      </>
  );
};

export default Bar