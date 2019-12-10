import React, {useState} from "react";
import barService from "../services/bars";
import helper from '../utils/validation_helper';

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
    // const capitalizeString = () => {
    //     return {
    //         name: helper.capitalize(barName),
    //         address: helper.capitalize(barAddress),
    //         city: helper.capitalize(barCity)
    //     }
    // };

    /**
     * Handles save button click for adding a bar
     * create bar object from user input and send to database
     * @returns {Promise<void>}
     */
    const addBarSubmit = async () => {
        //const barInfo = capitalizeString();
        //console.log('barinfo', barInfo);
        let flag;

        const figureOutPrice = (userInput) => {
            if (typeof userInput === 'string') {
                userInput = userInput.replace(',', '.');
            }
            if (!isNaN(Number.parseFloat(userInput)) && Number.parseFloat(userInput) > 0) {
                console.log(userInput, 'kaikki pitäs olla ok?');
                flag += '';
                return Number.parseFloat(userInput);
            } else if ((userInput === null || isNaN(userInput) || userInput === '' || userInput === 0)) {
                console.log(userInput, 'ei kelpo numero, ei vanhaa dataa');
                console.log('siideri on nan tai null:', userInput);
                flag += '.';
                return undefined;
            }
        };

        try {
            const prices = {
                beer: figureOutPrice(beer),
                cider: figureOutPrice(cider),
                longdrink: figureOutPrice(longdrink)
            };

            console.log('prices', prices);
            if ((beer === '' && cider === '' && longdrink === '') || (prices.beer === undefined && prices.cider === undefined && prices.longdrink === undefined)) {
                setNotification({msg: 'Please do tell decent prices!', sort: 'error'});
                throw new Error('No prices');
            }

            const bar = {
                name: helper.capitalize(barName),
                address: helper.capitalize(barAddress),
                city: helper.capitalize(barCity),
                prices: {
                    beer: beer === '' ? undefined : prices.beer,
                    longdrink: longdrink === '' ? undefined : prices.longdrink,
                    cider: cider === '' ? undefined : prices.cider,
                },
                user: user,
            };
            console.log('bar', bar);

            //debugger;
            const r = await barService.create(bar);
            setBars(r);
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
            //setNotification({msg: 'Something went wrong', sort: 'error'});
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
                <button className='inContentButton clickable' onClick={cancelAddBar}>Cancel</button>

            </form>
        </div>
    )
}

export default AddBar