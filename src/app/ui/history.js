import React, { useState, useEffect } from 'react';
import {find} from '../lib/action.js';






export default  function History({User}) {
  const [totalCharge, settotalCharge] = useState(null);
  
  
    useEffect(() => {
        
        const fetchData = async () => {
            try {
              
              // console.log(User)
                const retrievedObject = await find(User);
                settotalCharge(retrievedObject);
                
            } catch (error) {
                console.error("Error fetching data:", error);
                // Handle errors gracefully (e.g., display an error message)
            }
        };

        fetchData();
    }, [totalCharge]);
  
  return (
    <>
    {totalCharge && totalCharge.map((price, index) => (
      
      <>
        <div className='rides'>
        <h3>Ride to {price.location}</h3>
        <h3>Price: {price.charge}</h3>
        </div>
      </>
    )).reverse()}
      
          
      
        
    </>
  )
}
