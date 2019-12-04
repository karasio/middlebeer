import React, {useState} from "react";

const AddBar = () => {
    const [barName, setBarName] = useState('')
    const [barAddress, setBarAddress] = useState('')
    const [barCity, setBarCity] = useState('')
    const [beer, setBeer] = useState(0);
    const [cider, setCider] = useState(0);
    const [longdrink, setLongdrink] = useState(0);

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


    const addBarSubmit = () => {
        console.log('submit tähän')
    }

    return (
        <div>
            <form onSubmit={() => addBarSubmit()}>
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
                <button onClick={() => console.log('cancel tästä')}>cancel</button>

            </form>
        </div>
    )
}

export default AddBar