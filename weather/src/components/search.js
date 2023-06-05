import React, {useEffect, useState} from 'react'
import './css/search.css'


const APIKEY = "52bb7333bcc8a033301cc092d3aee1ba";

const Searchbar = () => {
    const [city,setCity] =  useState(null);
    const[response, setResponse]=useState(null);

   
    const fetchApi= () => {
        fetch(`http://api.openweathermap.org/data/2.5/weather?&appid=${APIKEY}&q=${city}`)
        .then( (res) => { return res.json() }) // Convert data to json
        .then( (data) => {
            if(data.cod == '404'){
                alert("City Not Found");
                setResponse(null);
                return;
            };
            setResponse(data.main);
        })
        .catch( (err) => { console.log(err); alert("Connection Error"); setResponse(null)} )
    }
        
    return (
        <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-black backdrop-blur-[32px] rounded-[32px] py-12 px-6'>

        <div>
             
            <div className='flex flex-col justify-center flex'>
                <div className='mt-20 flex items-center justify-center'>
                    <input type="text" placeholder='Enter city name' className='required:border-red-500 required:border-b-2 focus:outline-none focus:border-black valid:border-b-2 valid:border-green-600 '
                     onChange={(event)=>{ setCity(event.target.value)}} required/>
                </div>
                <div className='mt-5 w-full items-center justify-center flex '>
                    <button onClick={()=>fetchApi()} className='bg-blue-700 text-white p-3 rounded-lg font-bold text-xl'>Search</button>
                </div>
                <div className='mt-3 w-full text-center'>
                    {
                        response?(<h2 className='font-bold'>Temperature: {parseInt(response.temp-273.15)}°C<br></br>Humidity :
                        {parseInt(response.humidity)}</h2>):(<></>) 
                    }
                </div>
            </div>
            
        </div>  
        </div>      
    );
}


export default Searchbar;








