import React, {useState} from "react";
import barService from "../services/bars";

/**
 * Component for rendering table of input fields to add a bar to site
 */

const AddBar = ({user, setBars, setNotification}) => {
    const [barName, setBarName] = useState('')
    const [barAddress, setBarAddress] = useState('')
    const [barCity, setBarCity] = useState('')
    const [beer, setBeer] = useState('');
    const [cider, setCider] = useState('');
    const [longdrink, setLongdrink] = useState('');

    const handleNameChange = (e) => {
        setBarName(e.target.value)
    }

    const handleAddressChange = (e) => {
        setBarAddress(e.target.value)
    }

    const handleCityChange = (e) => {
        setBarCity(e.target.value)
    }

    const handleBeerChange = (e) => {
        setBeer(e.target.value)
    }

    const handleCiderChange = (e) => {
        setCider(e.target.value)
    }

    const handleLongdrinkChange = (e) => {
        setLongdrink(e.target.value)
    }

    /**
     * Function to fix user input with first upper case letter and rest lower case letter
     * @returns {{address: *, city: *, name: *}}
     */
    const capitalizeString = () => {
        const capitalize = (value) => {
            return value.toLowerCase()
            .split(/ /)
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ');
        };

        return {
            name: capitalize(barName),
            address: capitalize(barAddress),
            city: capitalize(barCity)
        }
    };

    /**
     * Handles save button click for adding a bar
     * create bar object from user input and send to database
     * @returns {Promise<void>}
     */
    const addBarSubmit = async () => {
        const barInfo = capitalizeString();
        console.log('barinfo', barInfo);

         try {
             if (beer === '' && cider === '' && longdrink === '') {
                 setNotification({msg: 'Please do tell prices!', sort: 'error'})
                 throw new Error('No prices');
             }
             const bar = {
                 name: barInfo.name,
                 address: barInfo.address,
                 city: barInfo.city,
                 prices: {
                     beer: beer === '' ? undefined : beer,
                     longdrink: longdrink === '' ? undefined : longdrink,
                     cider: cider === '' ? undefined : cider,
                 },
                 user: user,
             }

             console.log(barName, barAddress, barCity);
             //debugger;
             const r = await barService.create(bar)
             setBars(r)
             setNotification({msg: 'Bar added', sort: 'info'});
             setTimeout(() => {
                 setNotification({msg: null, sort: null});

             }, 5000);
             setBarName('')
             setBarAddress('')
             setBarCity('')
             setBeer('')
             setCider('')
             setLongdrink('')
         } catch (exception) {
             console.log(exception);
             setNotification({msg: 'Something went wrong', sort: 'error'});
             setTimeout(() => {
                 setNotification({msg: null, sort: null});

             }, 5000);
         }
    };

    /**
     * Handles cancel button click when not adding a bar
     */
    const cancelAddBar = () => {
        setBarName('')
        setBarAddress('')
        setBarCity('')
        setBeer('')
        setCider('')
        setLongdrink('')
        console.log('cancel tästä')
    };

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                addBarSubmit();
            }}>
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td><input value={barName}
                                   onChange={handleNameChange}
                                   placeholder="Janoinen poro"/>

                        </td>
                    </tr>
                    <tr>
                        <td>Address</td>
                        <td><input value={barAddress}
                                   onChange={handleAddressChange}
                                   placeholder="Porokuja 1 A"/>

                        </td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td><input value={barCity}
                                   onChange={handleCityChange}
                                   placeholder="Utsjoki"/>

                        </td>
                    </tr>
                    <tr>
                        <td>Beer</td>
                        <td><input
                            value={beer}
                            onChange={handleBeerChange}
                            placeholder="5.80"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Cider</td>
                        <td><input
                            value={cider}
                            onChange={handleCiderChange}
                            placeholder="6.50"
                        />
                        </td>
                    </tr>
                    <tr>
                        <td>Long drink</td>
                        <td><input
                            value={longdrink}
                            onChange={handleLongdrinkChange}
                            placeholder="6.20"
                        />
                        </td>
                    </tr>
                    </thead>
                </table>
                <button className='inContentButton clickable' type='submit'>Add!</button>
                <button className='inContentButton clickable' onClick={() => cancelAddBar()}>Cancel</button>

            </form>
        </div>
    )
}

export default AddBar