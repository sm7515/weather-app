import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default function Home(props){
    const apiKey="1c21be6b762ca0d7fa474238dda57f8a";
    let [type, setType] = useState([]);
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState('');
    const urlParams = new URLSearchParams(props.location.search);
    const cityParam = urlParams.get('city') ? urlParams.get('city'):'New York'

    const queryWeatherAPI = function (cityParam) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityParam}&APPID=${apiKey}`)
        .then(function(response){
            setWeather(response.data);
            let i = 0;
            type = response.data.weather.map(t => { 
                let o=[]
                o[i]=`${t.description}; `; 
                i++;
                return o})
            setType(type)
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
        setCity(cityParam);
        queryWeatherAPI(cityParam);  
    }, [cityParam]);

    console.log(weather&&weather)
    console.log(type && type)

    return(
        <div>
        <div className='WeatherNav'>
            <a className={`WeatherNavItem ${city === 'Beijing' ? "WeatherNavItem--active":''}`} href='/?city=Beijing'>Beijing</a>
            <a className={`WeatherNavItem ${city === 'Shanghai' ? "WeatherNavItem--active" : ''}`} href='/?city=Shanghai'>Shanghai</a>
            <a className={`WeatherNavItem ${city === 'Tokyo' ? "WeatherNavItem--active" : ''}`} href='/?city=Tokyo'>Tokyo</a>
            <a className={`WeatherNavItem ${city === 'Seoul' ? "WeatherNavItem--active" : ''}`} href='/?city=Seoul'>Seoul</a>
        </div>
            <h1>Weather in {weather.name?weather.name:""}</h1>
            <p>weather type: {type ? type : ""}</p>
            <p>current temperature: {weather.main ? weather.main.temp:""}</p>
            <p>max temperature: {weather.main ? weather.main.temp_max : ""}</p>
            <p>min temperature: {weather.main ? weather.main.temp_min : ""}</p>
            <p>cloudiness: {weather.clouds ? weather.clouds.all : ""}</p>
            <p>visibility: {weather ? weather.visibility:""}</p>
            <p>humidity: {weather.main ? weather.main.humidity:""}</p>
            <p>wind speed: {weather.wind ? weather.wind.speed : ""}</p>
        </div>
    )
}

