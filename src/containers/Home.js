import React, {useEffect, useState} from 'react';
import axios from 'axios';
import WeatherIcon from '../components/WeatherIcon';
import GetDateStr from '../components/GetDateStr';
//import PageWrapper from '../components/PageWrapper';

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

    const today = new Date(date);

    // debug stuff
    console.log(weather&&weather)
    console.log(type && type.trim())
    console.log(F);

    return(
       // <PageWrapper cloudy={cloudy}>
       <div>
            <div className='WeatherNav'>
                <a className={`WeatherNavItem ${city === 'Beijing' ? "WeatherNavItem--active":''}`} href='/?city=Beijing'>Beijing</a>
                <a className={`WeatherNavItem ${city === 'Shanghai' ? "WeatherNavItem--active" : ''}`} href='/?city=Shanghai'>Shanghai</a>
                <a className={`WeatherNavItem ${city === 'Tokyo' ? "WeatherNavItem--active" : ''}`} href='/?city=Tokyo'>Tokyo</a>
                <a className={`WeatherNavItem ${city === 'Seoul' ? "WeatherNavItem--active" : ''}`} href='/?city=Seoul'>Seoul</a>
                <a className={`WeatherNavItem ${city === 'London' ? "WeatherNavItem--active" : ''}`} href='/?city=London'>London</a>
                <a className={`WeatherNavItem ${city === 'New York' ? "WeatherNavItem--active" : ''}`} href='/?city=New York'>New York</a>
            </div>
            <div className='WeatherContent'>
                <div className="WeatherContentHead">
                    <h1>{weather.name?weather.name:""}</h1>
                    <GetDateStr date={today}/>
                    <p>{typeArray ? typeArray : ""}</p>
                    <WeatherIcon weatherType={type} />
                    <h3>{tempType==='C'?C:F}
                        <button onClick={() => setTempType('C')}
                            className={`tempType ${tempType === 'C' ? 'C tempType__active' : ''}`}>°C</button>
                        <button onClick={()=>setTempType('F')} 
                            className={`tempType ${tempType === 'F'? 'F tempType__active' :''}`}>°F</button>
                    </h3>
                </div>
                <div className="WeatherMainContent">
                    <div className="WeatherItem">max temperature: <br></br>{weather.main ? weather.main.temp_max : ""}</div>
                    <div className="WeatherItem">min temperature: <br></br>{weather.main ? weather.main.temp_min : ""}</div>
                    <div className="WeatherItem">cloudiness: <br></br>{cloudy}</div>
                    <div className="WeatherItem">visibility: <br></br>{weather ? weather.visibility : ""}</div>
                    <div className="WeatherItem">humidity: <br></br>{weather.main ? weather.main.humidity : ""}</div>
                    <div className="WeatherItem">wind speed: <br></br>{weather.wind ? weather.wind.speed : ""}</div>
                </div>
            </div>
        </div>
       // </PageWrapper>
    )
}

