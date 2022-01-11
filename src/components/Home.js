import React, {useEffect, useState} from "react"
import { Container, Row, Col } from "react-bootstrap"
import Search from "./Search"
import Weather from "./Weather"
import { API_PREFIX, API_SUFFIX } from '../KEYS'
import axios from "axios"

const Home = (props) => {
    const [weather, setWeather] = useState(null)

    const handleSearch = async (country, state, city) => {
        console.log('received search!')
        console.log(country, state, city)
        const search = [city, state, country].join(',')
        const searchUrl = API_PREFIX + search + API_SUFFIX + '&units=imperial'
        console.log(searchUrl)
        const results = await axios(searchUrl)
        console.log(results.data)
        setWeather({
					main: results.data.main,
					weather: results.data.weather,
					name: results.data.name,
				})
    }

    useEffect(() => {

    }, [weather])

    const weatherJsx = (
        <Row>
            <Weather weather={weather} />
        </Row>
    )

    return (
			<Container fluid className='app-container'>
				<Row className="app-row">
					<Col>
						<Row>
							<Search search={handleSearch} />
						</Row>
						{weather ? weatherJsx : null}
					</Col>
				</Row>
			</Container>
		)
}

export default Home