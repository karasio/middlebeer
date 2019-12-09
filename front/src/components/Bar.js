import React, {useState} from 'react';
import barService from '../services/bars';
import '../styles/FrontPage.css'
//import Notification from './Notification';
/**
 * Component for rendering a bar to a list of bars
 * @param bar - one bar
 * @param bars bars - list of bars
 * @param setBars - to alter list of bars
 * @param user - user that is logged in
 * @param setNotification - to alter notification object
 * @param notification - notification object
 * @returns {*}
 */

const Bar = ({ bar, bars, setBars, user, setNotification, notification }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' };
  const showWhenVisible = { display: detailsVisible ? '' : 'none' };
  const [editVisible, setEditVisible] = useState(false);
  const showDefault = {display: editVisible ? 'none' : ''};
  const showEdit = { display: editVisible ? '' : 'none'};
  const [beer, setBeer] = useState(bar.prices.beer === undefined ? 0.00 : bar.prices.beer);
  const [cider, setCider] = useState(bar.prices.cider === undefined ? 0.00 : bar.prices.cider);
  const [longdrink, setLongdrink] = useState(bar.prices.longdrink === undefined ? 0.00 :  bar.prices.longdrink);

  /**
   * Function to handle liking a bar
   * Makes api call to change bar information on database and sets bars to useState variable
   */
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

  /**
   * Function to handle editing a bar
   * Checks user input so that it is valid
   * Makes api call to change bar information on database and sets bar to useState variable
   */
  const editBar = async () => {
    //console.log('beer', typeof(beer), 'cider', typeof(cider), 'longk', typeof(longdrink));

    let flag = '';

    /**
     * Checks user input for drink prices (expecting numbers) and validates it
     * if input is valid
     * @returns user input
     * if user input is invalid & former price can be found in database
     * @returns former price
     * if user input is invalid and no former price can be found in database
     * @returns undefined
     */
    const figureOutPrice = (userInput, priceFromDb) => {
      if(!isNaN(Number.parseFloat(userInput)) && Number.parseFloat(userInput) > 0) {
        console.log(userInput, 'kaikki pitäs olla ok?');
       flag += '';
        return Number.parseFloat(userInput);
      } else if ((userInput === null || isNaN(userInput) || userInput === '' || userInput === 0) && !priceFromDb) {
        console.log(userInput, 'ei kelpo numero, ei vanhaa dataa');
        console.log('siideri on nan tai null:', userInput);
        console.log('kannasta', priceFromDb);
        flag += '.';
        return undefined;
      } else if (priceFromDb) {
        console.log(userInput,'vanhassa datassa hinta, mutta uus huttua');
        flag += '.';
        return priceFromDb;
      }
    };

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

    if(flag === '') {
      setNotification({msg: 'Data changed', sort: 'info'});
      setTimeout(() => {
        setNotification({msg: null, sort: null})
      }, 5000);

    } else {
      setNotification({msg: 'Something went wrong', sort: 'error'});
      setTimeout(() => {
        setNotification({msg: null, sort: null})
      }, 5000);
    }
    console.log(bar.id, edited.prices);

    //debugger;
    const returnedBars = await barService.update(bar.id, edited);
    // setNotification({msg: 'tööt', sort: 'error'});
    // debugger;
    // setTimeout(() => {
    //   setNotification({msg: null, sort: null});
    // }, 5000);
    setBars(returnedBars);
    setEditVisible(false);
    setBeer(bar.prices.beer === undefined ? 0.00 : bar.prices.beer);
    setCider(bar.prices.cider === undefined ? 0.00 : bar.prices.cider);
    setLongdrink(bar.prices.longdrink === undefined ? 0.00 : bar.prices.longdrink);
  };

  /**
   * Function to handle removing a bar
   * Makes api call to delete bar information from database and sets bars to useState variable
   */
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
          {/*<Notification message={notification} />*/}
            {user !== null ?
                <ul style={showEdit}>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    editBar();
                  }}>
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
          { user !== null ? <button onClick={() => removeBar(bar.id)}>remove</button> : <></> }
        </div>
      </>
  );
};

export default Bar