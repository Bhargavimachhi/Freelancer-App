import React from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const OnBoarding = () => {

     const { user,isLoaded } = useUser();
     const navi = useNavigate();
    


     const handleSubmit = async () => {
        const userData = {
            Clerk_id: user?.id,
            name: user?.firstName,
            email: user?.primaryEmailAddress.emailAddress
        };
        console.log(userData);

        try {
            const response = await axios.post('http://localhost:3000/user/add', userData);
            console.log(response.data);

            if (response.data.message === 'User Added Successfully') {
                alert("User added successfully.Redirecting you to dashboard...");
                navi('/DashBoard');

            } else {
                console.error('Failed to add user');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


  return (
    <>
     <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold text-center mt-4">{user?.firstName} is going through the onboarding stage</h1>
            <p> Your Email :{user?.primaryEmailAddress.emailAddress} </p>
            <button 
                className="mt-8 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                onClick={handleSubmit}
                
            >
                Submit
            </button>
        </div>





    
    
    </>
  )
}

export default OnBoarding