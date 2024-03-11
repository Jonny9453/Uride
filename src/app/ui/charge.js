import { useUser } from '@auth0/nextjs-auth0/client';
import {update} from '../lib/action.js'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import './charge.css';
import PermPhoneMsgIcon from '@mui/icons-material/PermPhoneMsg';
import CloseIcon from '@mui/icons-material/Close';

export default function Charge({totalCharge, location}) {
  const[search, setsearch]=useState(false)
  const[driver, setDriver]=useState(false)
  const [timer, setTimer]=useState(false)
  const [cancel, setCancel]=useState(false)
  

  
  const {user}= useUser()
    const updatedata=()=>{
        setsearch(true)
        setTimeout(()=>{
          setDriver(true)
        },3000)
    }

    const updateTime=()=>{
      update(totalCharge,user,location)
       setTimer(true)
       setCancel(true)
    }

    const cancelfuntion=()=>{
      setTimer(false)
      setCancel(false)
      setDriver(false)
      setsearch(false)
    }
  return (
    <>
        {
          search?
          <>{driver?<div className='driverBox'><div className='driver'><Image src="/img/DriverImage.webp"  width={40} height={40} alt="Driver_Image"/><h3>Aron Finch</h3></div><PermPhoneMsgIcon className='phone' sx={{ fontSize: 30 }}/></div>:<h3 className='search'>Scaning...</h3>}
          
          <h3>Price: Rs. {totalCharge} </h3>
          {timer?<h3 className='timer'>10:30</h3>:null}
          {cancel?<button onClick={cancelfuntion}><CloseIcon sx={{fontSize:30, color:"red" }}/></button>:<button onClick={updateTime}>Start</button>}
          </>:
          
          <>
          <><h3>Price: Rs. {totalCharge} </h3>
          <button onClick={updatedata}>Scan</button></>
          
          
          </>
        }
        
    </>
  )
}
