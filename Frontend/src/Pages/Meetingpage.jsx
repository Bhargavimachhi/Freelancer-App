import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const Meetingpage = () => {

    const {roomId} = useParams();

    const Mymeeting = async (element) =>{
        const appid = 140815372;
        const ServerSecret = "62fd0f6f763a017e66678806ce5b64de";
        const kittoken = ZegoUIKitPrebuilt.generateKitTokenForTest(appid,ServerSecret,roomId,Date.now().toString(),"Manush");
        const zp = ZegoUIKitPrebuilt.create(kittoken);
        zp.joinRoom({
            container:element,
            scenario:{
                mode: ZegoUIKitPrebuilt.VideoConference
            }
        })

    };


  return (
    <>
    <h1>Meeting room</h1>

    <div ref={Mymeeting}/>


    
    
    </>
  )
}

export default Meetingpage