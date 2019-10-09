import React from 'react';

export default function PageWrapper({cloudy, hour, children}) {
    let night=false;
    if(hour>=18 || hour<=6)
        night =true;
    cloudy/=100;
    return(
        <div style={night ? { backgroundColor: `rgba(47,53,66,${(1-cloudy)<=0.3?0.3:(1-cloudy)})` } : { backgroundColor: `rgba(223,228,234,${cloudy})`}}>
            {children}
        </div>
    )
}