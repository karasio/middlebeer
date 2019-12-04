import React, {useEffect, useState} from 'react';
import Bar from '../components/Bar'
import {useField} from '../hooks';
import '../components/FrontPage.css'
import Notification from './Notification';
import AddBar from "./AddBar";

const FrontPage = ({bars, setBars, user, notification, setNotification}) => {
    const filterValue = useField('type: text');
    const [viewmodeSelector, setViewmodeSelector] = useState(true)
    const selectedLeft = {background: viewmodeSelector ? '#C7E2FF' : '#EDF4FA'}
    const selectedRight = {background: viewmodeSelector ? '#EDF4FA' : '#C7E2FF'}

    useEffect(() => {
        console.log('FrontPage useEffect', bars);
    }, [bars]);

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

    const sortBarByLikes = (bars) => {
        console.log('sorting by likes')
        let sortable = bars;
        return sortable.sort((a, b) => (a.likes < b.likes) ? 1 : (a.likes === b.likes) ? ((a.likes < b.likes) ? 1 : -1) : -1)
    }

    const sortBarByCheapestBeer = (bars) => {
        console.log('sorting by cheapest beer')
        let sortable = bars;
        return sortable.sort((a, b) => (a.prices.beer > b.prices.beer) ? 1 : (a.prices.beer === b.prices.beer) ? ((a.prices.beer > b.prices.beer) ? 1 : -1) : -1)
    }


    return (
        <div className='contentWrapper'>
            {console.log('rendering')}
            <div className='anecdote'><h1>"mmm.. tasty"</h1></div>

            <div className='filterInputWrapper'>
                <input className='filterInput'
                       {...filterValue.object}
                       placeholder={'filter results by bar name or city'}
                />
            </div>

            <div className='listViewRadioWrapper'>
                <button className='listViewRadioButton' id='listViewRadioButtonLeft'
                        onClick={() => setViewmodeSelector(true)}
                        style={selectedLeft}>
                    TOP 5
                </button>
                <button className='listViewRadioButton' id='listViewRadioButtonRight'
                        onClick={() => setViewmodeSelector(false)}
                        style={selectedRight}>
                    Cheapest
                </button>
            </div>

            <div className='barsWrapper'>
                <Notification message={notification}/>
                {viewmodeSelector ?
                    barsToShow(sortBarByLikes(getFilteredBars(filterValue))) :
                    barsToShow(sortBarByCheapestBeer(getFilteredBars(filterValue)))
                }
            </div>


            <AddBar user={user} setBars={setBars}/>
        </div>

    );
};


export default FrontPage;