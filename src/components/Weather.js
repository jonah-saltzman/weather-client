import React from "react"
import { Container, Row, Col } from "react-bootstrap"

const Weather = ({weather}) => {
    console.log(weather)

    return (
			<>
				<Container className='weather-container'>
					<Row>
						<Col>
							<Row>
								<h1>Weather in {weather.name}</h1>
							</Row>
							<Row>
								<h3>Conditions: {weather.weather[0].description}</h3>
							</Row>
							<Row>
								<h3>Temp: {weather.main.temp}</h3>
							</Row>
						</Col>
					</Row>
				</Container>
			</>
		)
}

export default Weather