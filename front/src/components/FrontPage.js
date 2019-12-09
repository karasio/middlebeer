import React, {useEffect, useState} from 'react';
import Bar from '../components/Bar'
import {useField} from '../hooks';
import '../styles/FrontPage.css'
import Notification from './Notification';
//import AddBar from "./AddBar";
import beerPic from '../media/4800234604_23f50117e9_c.jpg'

/**
 * Component for front page view with list of bars and info text
 */

const FrontPage = ({bars, setBars, user, notification, setNotification}) => {
    const filterValue = useField('type: text');
    const [viewmodeSelector, setViewmodeSelector] = useState(true)
    const selectedLeft = {background: viewmodeSelector ? '#C7E2FF' : '#EDF4FA'}
    const selectedRight = {background: viewmodeSelector ? '#EDF4FA' : '#C7E2FF'}

    useEffect(() => {
        console.log('FrontPage useEffect', bars);
    }, [bars]);

    useEffect(() => {
        // TODO MITEN HALP FILTERVALUEKSI user.defaultCity!!
      console.log('USER!!!!!!!', user);
      if (user != null){
        filterValue.object.setValue(user.defaultCity);
        }else{
        filterValue.object.setValue('');
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
            )
        });

    /**
     * Filter bar list according to filter value
     * @returns filtered array
     */
    const getFilteredBars = (exp) => {
        let pattern = new RegExp(exp.object.value, 'i')
        let filteredBarsCopy = []

        bars.forEach(bar => {
            // console.log('filtering', pattern, bar.name, pattern.test(bar.name))
            if (pattern.test(bar.name) || pattern.test(bar.city)) {
                filteredBarsCopy.push(bar)
            }
        })
        return filteredBarsCopy
    }

    /**
     * sorts bar list according to likes
     * @returns array filtered by bar.likes ascending
     */
    const sortBarByLikes = (bars) => {
        //console.log('sorting by likes')
        let sortable = bars;
        return sortable.sort((a, b) => (a.likes < b.likes) ? 1 : (a.likes === b.likes) ? ((a.likes < b.likes) ? 1 : -1) : -1)
    }

    /**
     * sorts bar list according to beer price
     * @returns array filtered by bar.prices.beer ascending
     */
    const sortBarByCheapestBeer = (bars) => {
        //console.log('sorting by cheapest beer')
        let sortable = bars;

        // tällä sai satumaan pois ekalta paikalta
        const noBeer = (bar) => {
            return bar.prices.beer !== undefined;
        };
        sortable = bars.filter(noBeer);
        //
        return sortable.sort((a, b) => (a.prices.beer > b.prices.beer) ? 1 : (a.prices.beer === b.prices.beer) ? ((a.prices.beer > b.prices.beer) ? 1 : -1) : -1)
    }

    const infoText =
        'MiddleBeer is built to help you decide where to crab a pint ' +
        ' or several if such is your wish. List above helps every user, however as a logged' +
        ' in user you can submit your own entry and set preferences which ' +
        'city is shown as a default.';

    return (
        <div className='contentWrapper'>
            {/*{console.log('rendering')}*/}
            <div className='anecdote'><h1>"mmm.. tasty"</h1></div>

            <div className='filterInputWrapper'>
                <input className='filterInput'
                       {...filterValue.object}
                       placeholder={'filter results by bar name or city'}
                />
            </div>

            <div className='radioButtonWrapper'>
                <div className='listViewRadioButtons'>
                    <button className='listViewRadioButton' id='listViewRadioButtonLeft'
                            onClick={() => setViewmodeSelector(true)}
                            style={selectedLeft}>
                        Most liked!
                    </button>
                    <button className='listViewRadioButton' id='listViewRadioButtonRight'
                            onClick={() => setViewmodeSelector(false)}
                            style={selectedRight}>
                        Cheap beer, now.
                    </button>
                </div>
            </div>

            <div className='barsWrapper'>
                <Notification message={notification}/>
                {viewmodeSelector ?
                    barsToShow(sortBarByLikes(getFilteredBars(filterValue))) :
                    barsToShow(sortBarByCheapestBeer(getFilteredBars(filterValue)))
                }
            </div>

            <div className='infoText'>
                {infoText}
                <div>
                    <img className='foto' src={beerPic} alt='pint of beer' />
                </div>
            </div>
        </div>

    );
};


export default FrontPage;