import React, { useId } from 'react'
import { useState,useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { OfferCard } from '@/components/FreelancerOfferCard'

const Offers = () => {

  const [userid,setuserid] = useState();

  const {user,isLoaded} = useUser();
  const [offers,setoffers] = useState([]);

     useEffect(() => {
            if (isLoaded && user) {
              setuserid(user.id);
              console.log(user.id);
             
            }
          }, [isLoaded, user]);

          
        useEffect(() => {

          const getoffers = async () =>{

            if(userid){
              const res = await axios.get(`http://localhost:3000/freelancer/offers/${userid}`);
              console.log(res.data.alloffers);
              setoffers(res.data.alloffers);
            }
           

          }
          getoffers();
         
       
           // return () => chatClient.disconnectUser();
         }, [userid]);
        


  return (
    <>
   <h1 className="text-4xl font-bold text-center mt-4">Welcome, {user?.fullName}! This is are offers you got: </h1>

   {offers.length > 0 ? (
    <>
    {
      offers.map((offer)=>(
        <OfferCard key={offer._id} offer={offer} />
      ))
    }
    
    </>
   ):(
    <>
    <h1> No offers</h1>
    </>
   )}
   </>


  )
}

export default Offers