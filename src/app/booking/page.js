"use client";
import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';

import  "./page.css";
import { useState, useEffect } from 'react';
import Charge from '../ui/charge';
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from "@vis.gl/react-google-maps"
import History from '../ui/history';
import { useUser } from '@auth0/nextjs-auth0/client';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';



export default withPageAuthRequired( function Page() {
  require('dotenv').config()
 
  const position= { lat: 43.6532, lng: -79.3832};
  const [locationvalue, setlocationValue]=useState(null)
  const [totalCharge, setTotalCharge] = useState(0); // Define totalCharge state
  
  const handleTotalCharge = (charge) => {
    setTotalCharge(charge); // Update totalCharge state
  };

  const { user } = useUser();
  useEffect(()=>{
    const handleChange =(event)=>{
      console.log(event.target.value)
      setlocationValue(event.target.value)
    }

    document.getElementById("location").addEventListener("change", handleChange);

 
  },[])
  

  // console.log("mayank")
  // console.log(user)
  
  return (
    <>
         <main>
          <section id='search'>
            <div className='searchBox'>
              <div className="search-container">
                  <input type="text" id="location" placeholder="Enter your location"/>
                  <button id="search-btn">Search</button>
              </div>

              <div className="options">
                <h2>Select Your Ride</h2>
                <div className="vehicle-options">
                    <div className="option">
                    <DirectionsCarIcon sx={{fontSize:40}}/>
                    <p>Car</p>
                    </div>
                    <div className="option">
                    <TwoWheelerIcon sx={{fontSize:40}}/>
                    <p>Bike</p>
                    </div>
                </div>
              </div>
            </div>
            <div className="historyBox">
              <h2>Recent</h2>
              <div className='history'>
              
                <History User={user.email}/>
              </div>
            </div>
            

            <div className='detailCharge'>
               
               <Charge totalCharge={totalCharge} location={locationvalue}/>
               
            </div>
            
          </section>
            

            <div  id="map" style={{height:"100vh", width:"100%", borderLeft:"2rem solid grey",borderRight:"2rem solid grey", borderRadius:"2rem"}}>
              <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <Map 
                  id='map'
                  defaultCenter={position} 
                  defaultZoom={9}
                  gestureHandling={'greedy'}
                  mapId={process.env.NEXT_PUBLIC_MAP_ID} 
                  fullscreenControl={false}
                >
                  <Directions onTotalCharge={handleTotalCharge}/>
                  
                </Map>
              </APIProvider>
            </div>
            
        </main>
    </>
  )
})



function Directions({onTotalCharge}){
 
  
  const map= useMap();
  const routesLibrary= useMapsLibrary("routes");
  const [directionsService, setDirectionsService]= useState();
  const [directionsRenderer, setDirectionsRenderer]= useState();
  const [routes, setRoutes]= useState([])
  const [routeIndex, setRouteIndex]=useState(0);
  const selected =routes[routeIndex];
  const leg =selected?.legs[0];
  

  const [currentLocation, setcurrentLocation] = useState("");
  const [x, setX] = useState({});
  const [isInitialized, setIsInitialized] = useState(false);



  const [locations, setLocation] = useState("");
  const calculateRideCharge = async (leg) => {
    // Calculate totalCharge
    const totalCharge = await calculateTotalCharge(leg);
    // Call onTotalCharge with the totalCharge value
    onTotalCharge(totalCharge);
  };


  const calculateTotalCharge = async (leg) => {
    // Base rate (example: Rs5)
    console.log(leg)
    const baseRate = 5;
    
   if(!leg){
    return null
   }
    const distance =leg.distance.text;

    const numbersArray = distance.match(/\d+(\.\d+)?/g);
  // Join the matched digits into a single string
  const numbersString = numbersArray ? numbersArray.join("") : "";
  // Convert the string of numbers to a number
  const distanceNumber = parseFloat(numbersString);

    // Distance charge (example: 10Rs per kilometer)
    const distanceRate = 10;
    const distanceCharge = distanceNumber * distanceRate;

    // Time charge (example: 2Rs per minute)
    const timeRate = 2;
    const timeCharge = 10 * timeRate;

    // Total charge
    const totalCharge = baseRate + distanceCharge + timeCharge;

    return totalCharge;
  };

  useEffect(() => {
    calculateRideCharge(leg);
  }, [leg]);
useEffect(() => {
  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  const inputElement = document.getElementById("location");
  inputElement.addEventListener("change", handleChange);

  return () => {
    inputElement.removeEventListener("change", handleChange);
  };
}, []);
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      setX("Geolocation is not supported by this browser.");
    }
  
    async function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const location = { lat: latitude, lng: longitude };
      setX(location); // Update x state with location
      console.log(currentLocation)
    }
  }, [currentLocation]);
  
  useEffect(() => {
    if (!isInitialized && x.lat && x.lng) {
      
      async function fetchData() {
        const reverseGeocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${x.lat},${x.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;
        
        try {
          const response = await fetch(reverseGeocodingUrl);
          const featureCollection = await response.json();
          const formattedAddress = featureCollection.results[0].formatted_address;
          setcurrentLocation(formattedAddress); // Update currentLocation state with formatted address
        } catch (error) {
          console.error('Error fetching reverse geocoding data:', error);
        }
      }
      
      fetchData();
      
      setIsInitialized(true);
    }
  }, [x, isInitialized, currentLocation]);
  
  


  
  
  useEffect(()=>{
      if(!routesLibrary || !map) return;
      setDirectionsService(new routesLibrary.DirectionsService());
      setDirectionsRenderer(new routesLibrary.DirectionsRenderer({map}));
  },[routesLibrary, map])


  useEffect(()=>{
    if(!directionsService || !directionsRenderer || !currentLocation || !locations) return;

    // document.getElementById("location").addEventListener("change",setlocation(document.getElementById("location").value))

    directionsService.route({
      origin: currentLocation,
      destination: locations,
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives:true,
    }).then(response => {
      directionsRenderer.setDirections(response);
      setRoutes(response.routes)
    
    })
  }, [directionsService, directionsRenderer,currentLocation,locations]);

  useEffect(()=>{
    if(!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if(!leg){return null;} 
  
  return (<div className='summary'>
    <h2>{selected.summary}</h2>
    <p>{leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]} </p>
    <p>Distance: {leg.distance?.text}</p>
    <p>Duration: {leg.duration?.text}</p>

    <h2>Other Routes</h2>
    
      <ul>
      {routes.map((route, index) => (
        <li key={route.summary} onClick={()=>setRouteIndex(index)}>
          {route.summary}
        </li>
      ))}
      </ul>
   
      
      
        
      
    
  </div>)
  
  
}

