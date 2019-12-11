import React, { useEffect, useState } from 'react';
import Bar from '../components/Bar';
import { useField } from '../hooks';
import '../styles/FrontPage.css';
import infoTextIcon from '../media/001-beer-11.png';

/**
 * Component for front page view with list of bars and info text
 */

const FrontPage = ({ bars, setBars, user, notification, setNotification }) => {
  const filterValue = useField('text');
  const [viewmodeSelector, setViewmodeSelector] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const hideInfoText = { display: showInfo ? 'block' : 'none' };
  const selectedLeft = { background: viewmodeSelector ? '#C7E2FF' : '#EDF4FA' };
  const selectedRight = { background: viewmodeSelector ? '#EDF4FA' : '#C7E2FF' };

  // useEffect(() => {
  //     console.log('FrontPage useEffect', bars);
  // }, [bars]);

  useEffect(() => {
    if (user !== null && user.defaultCity) {
      filterValue.setValue(user.defaultCity);
    } else {
      filterValue.setValue('');
    }
    // user.defaultCity !== undefined ? filterValue.object.setValue(user.defaultCity) : ''
  }, [user]);

  const barsToShow = (barArray) =>
    barArray.map(bar => {
      return (
        <Bar
          key={bar.id}
          bar={bar}
          user={user}
          setBars={setBars}
          bars={bars}
          setNotification={setNotification}
          notification={notification}
        />
      );
    });

  /**
     * Filter bar list according to filter value
     * @returns filtered array
     */
  const getFilteredBars = (exp) => {
    let pattern = new RegExp(exp.object.value, 'i');
    let filteredBarsCopy = [];

    bars.forEach(bar => {
      // console.log('filtering', pattern, bar.name, pattern.test(bar.name))
      if (pattern.test(bar.name) || pattern.test(bar.city)) {
        filteredBarsCopy.push(bar);
      }
    });
    return filteredBarsCopy;
  };

  /**
     * sorts bar list according to likes
     * @returns array filtered by bar.likes ascending
     */
  const sortBarByLikes = (bars) => {
    //console.log('sorting by likes')
    let sortable = bars;
    return sortable.sort((a, b) => (a.likes < b.likes) ? 1 : (a.likes === b.likes) ? ((a.likes < b.likes) ? 1 : -1) : -1);
  };

  /**
     * sorts bar list according to beer price
     * @returns array filtered by bar.prices.beer ascending
     */
  const sortBarByCheapestBeer = (bars) => {
    //console.log('sorting by cheapest beer')
    let sortable = bars;
    const noBeer = (bar) => {
      return bar.prices.beer !== undefined;
    };
    sortable = bars.filter(noBeer);

    return sortable.sort((a, b) => (a.prices.beer > b.prices.beer) ? 1 : (a.prices.beer === b.prices.beer) ? ((a.prices.beer > b.prices.beer) ? 1 : -1) : -1);
  };

  const InfoText = ({ showInfo, setShowInfo }) => {

    const infoTextString =
            'MiddleBeer is built to help you decide where to crab a pint ' +
            ' or several if such is your wish. List above helps every user, however as a logged' +
            ' in user you can submit your own entry and set preferences which ' +
            'city is shown as a default.';

    return (
      <div className='infoTextWrapper clickable'onClick={() => setShowInfo(!showInfo)}>
        <div className='infoTextHeaderWrapper'>
          <div className='infoTextHideButton'>
            {showInfo ? 'Hide help' : 'Show help'}
          </div>
        </div>
        <div className='infoTextContentWrapper' style={hideInfoText}>
          <img className='infoTextIcon' src={infoTextIcon} alt='pint of beer'/>
          {infoTextString}

        </div>
      </div>
    );
  };




  return (
    <div>
      <div className='filterInputWrapper'>
        <input className='filterInput'
          {...filterValue.object}
          placeholder={'filter results by bar name or city'}
        />
      </div>

      <div className='radioButtonWrapper'>
        <div className='listViewRadioButtons'>
          <button className='listViewRadioButton clickable' id='listViewRadioButtonLeft'
            onClick={() => setViewmodeSelector(true)}
            style={selectedLeft}>
                        Most liked!
          </button>
          <button className='listViewRadioButton clickable' id='listViewRadioButtonRight'
            onClick={() => setViewmodeSelector(false)}
            style={selectedRight}>
                        Cheap beer, now.
          </button>
        </div>
      </div>


      <div className='barsWrapper'>
        {viewmodeSelector ?
          barsToShow(sortBarByLikes(getFilteredBars(filterValue))) :
          barsToShow(sortBarByCheapestBeer(getFilteredBars(filterValue)))
        }
      </div>
      <InfoText showInfo={showInfo} setShowInfo={setShowInfo}/>
      <div style={{ float: 'right', marginTop: '50px' }}>Icons made by <a
        href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good
                Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
    </div>

  );
};


export default FrontPage;