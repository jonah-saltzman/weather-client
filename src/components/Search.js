import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Country, State, City } from 'country-state-city'
import Select, {PlaceholderProps} from 'react-select'

const Search = (props) => {
    const [country, setCountry] = useState(null)
    const [countryField, setCountryField] = useState(null)
    const [stateChoices, setStateChoices] = useState([])
    const [state, setState] = useState(null)
    const [stateField, setStateField] = useState(null)
    const [cityChoices, setCityChoices] = useState([])
    const [city, setCity] = useState(null)
    const [cityField, setCityField] = useState(null)
    const [searched, setSearched] = useState(true)

    const countries = Country.getAllCountries()
    const countryChoices = countries.map(country => ({value: country.isoCode, label: country.name}))

    const { search } = props

    const handleChange = (type, e) => {
        switch (type) {
            case 'COUNTRY':
                console.log(e)
                setCountry(e.value)
                setCountryField(e)
                break
            case 'STATE':
                console.log(e)
                setState(isNaN(e.value) ? e.value : e.label)
                setStateField(e)
                break
            case 'CITY':
                console.log(e)
                setCity(e.value)
                setCityField(e)
                break
        }
    }

    useEffect(() => {
        if (!country) {
            return
        }
        console.log('states of: ', country)
        const states = State.getStatesOfCountry(country)
        console.log(states)
        setStateChoices(
					states.map((state) => ({
						value: state.isoCode,
						label: state.name,
					}))
				)
        setSearched(false)
    }, [country])

    useEffect(() => {
        if (!state) {
            return
        }
        const cities = City.getCitiesOfState(country, state)
        console.log('all cities:')
        console.log(cities)
        setCityChoices(cities.map(city => ({
            value: city.name,
            label: city.name
        })))
        setSearched(false)
    }, [state])

    useEffect(() => {
        if (!city) {
            return
        }
        console.log('city selected, setting searched false')
        setSearched(false)
    }, [city])

    useEffect(() => {
        if (searched || !country) {
            setSearched(true)
            return
        } else {
            console.log('running search')
            if (!city) {
                search(country, null, state)
            } else {
                search(country, state, city)
            }
            setSearched(true)
        }
    }, [searched])

    const clickedCountry = () => {
        console.log('clicked country')
        resetCity()
        resetState()
    }

    const clickedState = () => {
        resetCity()
    }

    const resetCity = () => {
        setCity(null)
        setCityField(null)
        setCityChoices([])
    }

    const resetState = () => {
        setState(null)
        setStateField(null)
        setStateChoices([])
    }

    return (
			<Container style={{ display: 'flex' }} className='search-container'>
				<Select
                    onFocus={clickedCountry}
					onChange={(e) => handleChange('COUNTRY', e)}
					blurInputOnSelect
					placeholder='Country'
					className='country-selector button'
					options={countryChoices}
                    value={countryField}
				/>
				<Select
                    onFocus={clickedState}
					onChange={(e) => handleChange('STATE', e)}
					blurInputOnSelect
					placeholder={country ? 'State' : '---'}
					className='state-selector button'
					options={stateChoices}
					isDisabled={!country}
                    value={stateField}
				/>
				<Select
					onChange={(e) => handleChange('CITY', e)}
					blurInputOnSelect
					placeholder={state ? 'City' : '---'}
					className='city-selector button'
					options={cityChoices}
					isDisabled={!state}
                    value={cityField}
				/>
			</Container>
		)
}

export default Search