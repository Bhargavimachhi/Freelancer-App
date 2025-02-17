import React from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const DashBoard = () => {

    const { user,isLoaded } = useUser();

    const navi = useNavigate();

    useEffect(() => {
      const checkUserExists = async () => {
         
              const userData = {
                  email: user?.primaryEmailAddress.emailAddress
              }
              
              try {
                console.log("This is the user data",userData);
                  const response = await axios.post('http://localhost:3000/checkifuserexists',userData);
                  console.log(response.data)

                  if (response.data.message === 'User does not exist in database') {
                      console.log("It worked")
                      navi('/Onboarding')
                  }
              } catch (error) {
                  console.error('Error checking user existence:', error)
              }
          
      }

      
          checkUserExists();
      
  }, [user,navi]);

  if (!isLoaded) {
    return <h1>Loading...</h1>
}





 

  return (
    <>

<div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold text-center mt-4">Welcome, {user?.fullName}!</h1>
            <p className="text-lg mt-2">You are logged in as Freelancer.</p>
            <header className="mt-8">
                <h2 className="text-2xl">Messages</h2>
                <h1>{user?.primaryEmailAddress.emailAddress}</h1>
              
            </header>
        </div>

    
    
    </>
  )
}

export default DashBoard