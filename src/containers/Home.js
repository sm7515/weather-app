import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Home(props){
    const apiKey="1c21be6b762ca0d7fa474238dda57f8a";
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({});

    const queryWeatherAPI = function(queryCity) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${queryCity}&APPID=${apiKey}`)
        .then(function(response){
            //console.log('response',response);
            setWeather(response.data);
            return response;
        })
        .catch(function(error){
            console.log('error',error);
            return error;
        })
        .finally(function(){

        })
    }


    useEffect(()=>{
        setCity('Beijing');
        queryWeatherAPI('Beijing');   
    },[]);

    //console.log(weather && weather);
    return(
        <div>
            <h1>Weather in {city}</h1>
            <p>temperature: {weather.main ? weather.main.temp:""}</p>
            <p>humidity: {weather.main ? weather.main.humidity:""}</p>
        </div>
    )
}

