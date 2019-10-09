import React from 'react'

export default function GetDateStr({date}){
    const dayArray=['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
    var monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const day=dayArray[date.getDay()];
    const ddate=date.getDate();
    const month = monthArray[date.getMonth()];
    const year=date.getFullYear();
    const hour=date.getHours();
    const ampm = hour >= 12 ? 'pm' : 'am';
    let minutes=date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hour + ':' + minutes + ' ' + ampm;
    const s=`${strTime} - ${day}, ${ddate} ${month} ${year}`
    
    return(
        <p className="date">{s}</p>
    )
}