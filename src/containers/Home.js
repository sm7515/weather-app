import React, {useEffect, useState} from 'react';
import axios from 'axios';
import WeatherIcon from '../components/WeatherIcon';
import GetDateStr from '../components/GetDateStr';
import PageWrapper from '../components/PageWrapper';

export default function Home(props){
    const apiKey="1c21be6b762ca0d7fa474238dda57f8a";
    let [type, setType] = useState('');
    let [typeArray, setTypeArray]=useState([]);
    const [weather, setWeather] = useState({});
    const [city, setCity] = useState('');
    const [cloudy, setCloudy] = useState();
    const [date, setDate] = useState([]);
    const [F,setF]=useState();
    const [C, setC] = useState();
    const [tempType, setTempType]=useState('C');
    const [night, isNight] = useState(false);

    const queryWeatherAPI = function (cityParam) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityParam}&units=metric&APPID=${apiKey}`)
        .then(function(response){
            setWeather(response.data);
            typeArray = response.data.weather.map(
                t => {
                    let s = '';
                    s = t.main + " ";
                    return s;
                })
            setTypeArray(typeArray)
            setType(typeArray[0].trim())
            setCloudy(response.data.clouds.all)
            setC(response.data.main.temp);
            return response;
        })
        .catch(function(error){
            console.log('error',error);
            return error;
        })
        .finally(function(){

        })
    }

    const queryF = function (cityParam) {
        axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityParam}&units=imperial&APPID=${apiKey}`)
        .then(function (response) {
            setF(response.data.main.temp)
            return response
        })
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(props.location.search);
        const cityParam = urlParams.get('city') ? urlParams.get('city') : 'New York'
        setCity(cityParam);
        queryWeatherAPI(cityParam); 
        queryF(cityParam);
        setDate(new Date());
    }, []);

    const today = localTime(date, weather.timezone/3600);
    let hour=today.getHours();
    useEffect(()=>{
        if (hour >= 18 || hour <= 6)
            isNight(true);
    })

    // debug stuff
    console.log(weather&&weather)
    // // console.log(type && type.trim())
    // // console.log(F);
    // console.log(date)
    // console.log(weather.timezone)

    function localTime(date, offset) {
        const d = new Date(date);
        const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        const nd = new Date(utc + (3600000 * offset));
        return nd;
    }

    return(
       <PageWrapper cloudy={cloudy} hour={hour}>
       <div>
            <div className='WeatherNav'>
                <a className={`WeatherNavItem ${city === 'Beijing' && !night?"WeatherNavItem--active":''} ${night ?'WeatherNavItem--night':''}
                ${city === 'Beijing' && night ? "WeatherNavItem--active--night" : ''}`} href='/?city=Beijing'>Beijing</a>
                <a className={`WeatherNavItem ${city === 'Shanghai' && !night?"WeatherNavItem--active":''} ${night ? 'WeatherNavItem--night' : ''}
                ${city === 'Shanghai' && night ? "WeatherNavItem--active--night" : ''}`} href='/?city=Shanghai'>Shanghai</a>
                <a className={`WeatherNavItem ${city === 'Tokyo' && !night? "WeatherNavItem--active" : ''} ${night ? 'WeatherNavItem--night' : ''}
                ${city === 'Tokyo' && night ? "WeatherNavItem--active--night" : ''}`} href='/?city=Tokyo'>Tokyo</a>
                <a className={`WeatherNavItem ${city === 'Seoul' && !night? "WeatherNavItem--active" : ''} ${night ? 'WeatherNavItem--night' : ''}
                ${city === 'Seoul' && night ? "WeatherNavItem--active--night" : ''}`} href='/?city=Seoul'>Seoul</a>
                <a className={`WeatherNavItem ${city === 'Berlin' && !night? "WeatherNavItem--active" : ''} ${night ? 'WeatherNavItem--night' : ''}
                ${city === 'Berlin' && night ? "WeatherNavItem--active--night" : ''}`} href='/?city=Berlin'>Berlin</a>
                <a className={`WeatherNavItem ${city === 'London' && !night? "WeatherNavItem--active" : '' } ${night ? 'WeatherNavItem--night' : ''}
                ${city === 'London' && night ? "WeatherNavItem--active--night" : ''}`} href='/?city=London'>London</a>
                <a className={`WeatherNavItem ${city === 'New York' && !night ? "WeatherNavItem--active" : ''} ${night ? 'WeatherNavItem--night' : ''}
                ${city === 'New York' && night ? "WeatherNavItem--active--night" : ''}`} href='/?city=New York'>New York</a>
            </div>
            <div className='WeatherContent'>
                <div className={night ? "WeatherContentHead--night":"WeatherContentHead"}>
                    <h1 className="cityName">{weather.name?weather.name:""}</h1>
                    <GetDateStr date={today}/>
                    <h2 className="temp">{tempType==='C'?C:F}
                        <button onClick={() => setTempType('C')}
                            className={`${night ? 'tempType--night': 'tempType'} ${tempType === 'C'&& !night ? 'C tempType__active' : ''}
                            ${tempType === 'C' && night? 'C--night tempType__active--night' : ''}`}>°C</button>
                        <button onClick={()=>setTempType('F')} 
                            className={`${night ? 'tempType--night' :'tempType' } ${tempType === 'F'&&!night? 'F tempType__active' :''}
                            ${tempType === 'F' &&night? 'F--night tempType__active--night' : ''}`}>°F</button>
                    </h2>
                    <p className='weatherType'>{typeArray ? typeArray : ""}</p>
                </div>
                <WeatherIcon weatherType={type} night={night}/>
                <div className="WeatherMainContent">
                    <div className={night ? "WeatherItem--night" :"WeatherItem"}><p className="dataTitle">max temperature </p>{weather.main ? weather.main.temp_max : ""}</div>
                    <div className={night ? "WeatherItem--night" : "WeatherItem"}><p className="dataTitle">min temperature </p>{weather.main ? weather.main.temp_min : ""}</div>
                    <div className={night ? "WeatherItem--night" : "WeatherItem"}><p className="dataTitle">cloudiness </p>{cloudy}</div>
                    <div className={night ? "WeatherItem--night" : "WeatherItem"}><p className="dataTitle">visibility </p>{weather ? weather.visibility : ""}</div>
                    <div className={night ? "WeatherItem--night" : "WeatherItem"}><p className="dataTitle">humidity </p>{weather.main ? weather.main.humidity : ""}</div>
                    <div className={night ? "WeatherItem--night" : "WeatherItem"}><p className="dataTitle">wind speed </p>{weather.wind ? weather.wind.speed : ""}</div>
                </div>
            </div>
        </div>
        </PageWrapper>
    )
}

