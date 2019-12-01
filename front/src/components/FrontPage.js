import React, {useEffect, useState} from 'react';
import Bar from '../components/Bar'
import barService from '../services/bars';
import { useField } from '../hooks';
import '../components/FrontPage.css'

const FrontPage = ({user}) => {
  const [bars, setBars] = useState([]);
  const filterValue = useField('type: text');

  useEffect( () => {
    barService
    .getAll()
    .then(initialBars => setBars(initialBars));
  }, []);

  useEffect(() => {
    console.log('FrontPage useEffect',bars);
  }, [bars]);

  const allBars = () =>
    // TODO ei mene tänne enää sitten kun bars arrayssa on pituutta?
    bars.map(bar => {
      return (
          <Bar
              key={bar.id}
              bar={bar}
          />
      )
    });

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
        {allBars()}
      </div>
  );
};

export default FrontPage;