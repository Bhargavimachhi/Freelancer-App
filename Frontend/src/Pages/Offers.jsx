import React, { useId } from "react";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { OfferCard } from "@/components/FreelancerOfferCard";

const Offers = () => {
  const [userid, setuserid] = useState();

  const { user, isLoaded } = useUser();
  const [offers, setoffers] = useState([]);

  useEffect(() => {
    if (isLoaded && user) {
      setuserid(user.id);
      console.log(user.id);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    const getoffers = async () => {
      if (userid) {
        const res = await axios.get(
          `http://localhost:3000/freelancer/${userid}/offers`
        );
        setoffers(res.data.alloffers);
      }
    };
    getoffers();

    // return () => chatClient.disconnectUser();
  }, [userid]);

  return (
    <>
      <h1 className="mt-4 text-4xl font-bold text-center">
        Welcome, {user?.fullName}! This is are offers you got:{" "}
      </h1>

      {offers.length > 0 ? (
        <>
          {offers.map((offer) => (
            <OfferCard key={offer._id} offer={offer} />
          ))}
        </>
      ) : (
        <>
          <h1> No jobs</h1>
        </>
      )}
    </>
  );
};

export default Offers;
