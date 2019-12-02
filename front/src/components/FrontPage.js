import React, {useEffect} from 'react';
import Bar from '../components/Bar'
import {useField} from '../hooks';
import '../components/FrontPage.css'
import Notification from './Notification';

const FrontPage = ({bars, setBars, user, notification, setNotification}) => {
    const filterValue = useField('type: text');

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

    return (
        <div>
            <h2>MiddleBEER</h2>
            <p>check where you'll be drinking next time!</p>
            <form>
                <input
                    {...filterValue.object}
                    placeholder={'filter results'}
                />
            </form>
            <Notification message={notification}/>
            {barsToShow(getFilteredBars(filterValue))}
        </div>
    );
};


export default FrontPage;