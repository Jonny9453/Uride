'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {create }from '../lib/action';



export  function ProfileClient({ onUpdateUserData }) {
  const { user, error, isLoading } = useUser();
  const [createCalled, setCreateCalled] = useState(false);
      
    
   
    useEffect(() => {
      if (!createCalled && user) {
        create(user);
        setCreateCalled(true);
         
            const userData = {
                name: user.name,
                picture: user.picture
              };
              onUpdateUserData(userData); 
        }
        
      }, [user,createCalled]);

  return (
    user && (
      <div>
        
        <h2 className='profileName'>Hi, {user.name? user.name :null}</h2>
        
      </div>
    )
  );
}