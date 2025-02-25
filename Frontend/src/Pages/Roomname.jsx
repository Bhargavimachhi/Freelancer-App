import React from 'react'
import {useState,useEffect} from "react";

const Roomname = () => {

    const [roomcode,setroomcode] = useState(0);


  return (
    <>
    <h1> Enter your room name</h1>
    <input type='number' value={roomcode} onChange={(e)=>{setroomcode(e.target.value)}}/>
    
    </>
  )
}

export default Roomname