import React, { useId } from "react";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import OfferCard from "../components/OffersCard";
import Navigate from "@/helpers/Navigate";

const MyOffers = () => {
  const [userid, setuserid] = useState();

  const { user, isLoaded } = useUser();
  const [offers, setoffers] = useState([]);

  useEffect(() => {
    if (isLoaded && user) {
      setuserid(user.id);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    const getoffers = async () => {
      if (userid) {
        const res = await axios.get(
          `http://localhost:3000/client/${userid}/offers`
        );
        setoffers(res.data.alloffers);
        console.log(res.data.alloffers);
      }
    };
    getoffers();

    // return () => chatClient.disconnectUser();
  }, [userid]);

  return (
    <section>
      <Navigate name={"My Offers"} item={""} path={"myoffers"} />
      <main className="mx-auto max-w-7xl">
        <div className="flex flex-col w-full gap-3 p-3 mb-6 sm:justify-between sm:items-center sm:flex-row">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome, {user?.fullName}! 🎉
            </h1>
            <p className="mt-2 text-lg text-text">
              Here are the latest offers tailored for your projects. Explore and
              grab the best deals now!
            </p>
          </div>
        </div>

        <div>
          {offers.length > 0 ? (
            <>
              {offers.map((offer) => (
                <OfferCard key={offer._id} offer={offer} />
              ))}
            </>
          ) : (
            <>
              <h1 className="w-full p-2 text-center"> No offers</h1>
            </>
          )}
        </div>
      </main>
    </section>
  );
};

export default MyOffers;
