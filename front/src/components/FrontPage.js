import React, {useEffect, useState} from 'react';
import Bar from '../components/Bar'
import {useField} from '../hooks';
import '../components/FrontPage.css'

const FrontPage = ({bars, setBars, user}) => {

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
        <div className='contentWrapper'>

            {/* tämä menee hooks > index.js:lle lomakkeen käsittelyyn, pitäisi
          passata filtteriarvoksi allBarsille?*/}
            <div className='anecdote'><h1>"mmm.. tasty"</h1></div>

            <div className='filterInputWrapper'>
                <input className='filterInput'
                       {...filterValue.object}
                       placeholder={'filter results by bar name or city'}
                />
            </div>
            <div>
            {barsToShow(getFilteredBars(filterValue))}
            </div>
        </div>
    );
};


export default FrontPage;