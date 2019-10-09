import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faCloudRain, faCloud, faSmog, faSnowflake, faWind} from '@fortawesome/free-solid-svg-icons'

export default function WeatherIcon({weatherType,night}) {

    let color='black';
    if(night){
        color='white'
    }

    switch (weatherType) {
        case 'Clear':
            return(
                <FontAwesomeIcon icon={faSun} size="6x" className='weatherIcon' color={color}/>
            )
        case 'Rain':
            return(
                <FontAwesomeIcon icon={faCloudRain} size="6x" className='weatherIcon' color={color}/>
            )
        case 'Clouds':
            return(
                <FontAwesomeIcon icon={faCloud} size="6x" className='weatherIcon' color={color}/>
            )
        case 'Mist':
            return (
                <FontAwesomeIcon icon={faSmog} size="6x" className='weatherIcon' color={color}/>
            )
        case 'Fog':
            return (
                <FontAwesomeIcon icon={faSmog} size="6x" className='weatherIcon' color={color}/>
            )
        case 'Snow':
            return (
                <FontAwesomeIcon icon={faSnowflake} size="6x" className='weatherIcon' color={color}/>
            )
        case 'Wind':
            return (
                <FontAwesomeIcon icon={faWind} size="6x" color={color}/>
            )
        default:
            return <div>{weatherType}</div>
    }
}