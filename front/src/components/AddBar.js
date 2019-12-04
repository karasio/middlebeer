import React, {useState} from "react";
import barService from "../services/bars";

const AddBar = ({user, setBars}) => {
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


    const addBarSubmit = async () => {
        console.log('submit tähän')
        const bar = {
            name: barName,
            address: barAddress,
            city: barCity,
            prices: {
                beer: beer,
                longdrink: longdrink,
                cider: cider,
            },
            user: user,
        }

        const r = await barService.create(bar)
        setBars(r)
        setBarName('')
        setBarAddress('')
        setBarCity('')
        setBeer('')
        setCider('')
        setLongdrink('')

    }

    const cancelAddBar = () => {
        setBarName('')
        setBarAddress('')
        setBarCity('')
        setBeer('')
        setCider('')
        setLongdrink('')
        console.log('cancel tästä')
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault()
                addBarSubmit()
            }
            }>

                <li>Name
                    <input value={barName}
                           onChange={handleNameChange}/>
                </li>
                <li>Address
                    <input value={barAddress}
                           onChange={handleAddressChange}/>
                </li>
                <li>City
                    <input value={barCity}
                           onChange={handleCityChange}/>
                </li>

                <li>Beer
                    <input
                        value={beer}
                        onChange={handleBeerChange}
                    />
                </li>
                <li>Cider
                    <input
                        value={cider}
                        onChange={handleCiderChange}
                    />
                </li>
                <li>Long drink
                    <input
                        value={longdrink}
                        onChange={handleLongdrinkChange}
                    />
                </li>


                <button className='clickable' type='submit'>Add!</button>
                <button onClick={() => cancelAddBar()}>cancel</button>

            </form>
        </div>
    )
}

export default AddBar