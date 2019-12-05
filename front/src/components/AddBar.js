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
                beer: beer === '' ? undefined : beer,
                longdrink: longdrink === '' ? undefined : longdrink,
                cider: cider === '' ? undefined : cider,
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
//TODO sisennykset....
    return (
        <div>

            <form onSubmit={(e) => {
                e.preventDefault()
                addBarSubmit()
            }
            }>
                <table>
                <thead>
                <tr>
                <td>Name</td>
                    <td><input value={barName}
                           onChange={handleNameChange}
                           placeholder="Janoinnen poro"/>

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
                            <button className='clickable' type='submit'>Add!</button>
  <button onClick={() => cancelAddBar()}>cancel</button>

            </form>
        </div>
    )
}

export default AddBar