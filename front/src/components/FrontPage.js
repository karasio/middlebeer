import React, {useEffect, useState} from 'react';
import Bar from '../components/Bar'
import barService from '../services/bars';
import {useField} from '../hooks';
import '../components/FrontPage.css'

const FrontPage = ({user}) => {
    const [bars, setBars] = useState([]);
    const filterValue = useField('type: text');

    useEffect(() => {
        barService
            .getAll()
            .then(initialBars => setBars(initialBars));
    }, []);

    useEffect(() => {
        console.log('FrontPage useEffect', bars);
    }, [bars]);

    const barsToShow = (barArray) =>
        barArray.map(bar => {
            return (
                <Bar
                    key={bar.id}
                    bar={bar}
                />
            )
        });

    const getFilteredBars = (exp) => {
        let pattern = new RegExp(exp.object.value, 'i')
        let filteredBarsCopy = []

        bars.forEach(bar => {
            // console.log('filtering', pattern, bar.name, pattern.test(bar.name))
            if (pattern.test(bar.name)) {
                filteredBarsCopy.push(bar)
            }
        })
        return filteredBarsCopy
    }

    return (
        <div>
            <form>
                {/* tämä menee hooks > index.js:lle lomakkeen käsittelyyn, pitäisi
          passata filtteriarvoksi allBarsille?*/}
                <input
                    {...filterValue.object}
                    placeholder={'filter results'}
                />
            </form>
            {barsToShow(getFilteredBars(filterValue))}
        </div>
    );
};


export default FrontPage;