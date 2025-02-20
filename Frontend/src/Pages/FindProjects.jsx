import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import { useUser } from '@clerk/clerk-react'
import ProjectCard from "../components/ProjectCard";
import { useNavigate } from "react-router-dom";
import LoadinPage from "@/components/LoadingPage";
const FindProjects = () => {

    const { user, isLoaded } = useUser();
      const [userId, setUserId] = useState(null);
      const [projects,setprojects] = useState([]);
      const [loading,setLoading] = useState(true);
      const navi = useNavigate();

      useEffect(() => {
        if (isLoaded && user) {
          setUserId(user.id);
          
        }
      }, [isLoaded, user]);

      useEffect(() => {
       const fetchprojects = async () =>{

        if (userId) {
            const res = await axios.get(`http://localhost:3000/user/${userId}/projects`);
            setprojects(res.data);
            setLoading(false);
          }

       }
    
        fetchprojects();
    
        // return () => chatClient.disconnectUser();
      }, [userId]);

      if(loading) {
        return <LoadinPage />
      }


  return (
    <>
    <h1 className="text-3xl font-bold mb-8 mt-5 ml-5">Projects For you : </h1>
    <div className="flex mt-5 ml-5">
    { projects.length > 0 ? (

        projects.map((project)=>{
            return(
             <ProjectCard
                            
                            name={project.title}
                            tags={project.tags}
                            experienceLevel={project.experienceLevel}
                            price={project.price}
                            onViewProject={() => {
                             
                                navi(`/project/${project._id}`)
                              
                            }}
                          />
            );

        })
      
        
    ) : (
        <>
        <h1> No projects found ...</h1>
        </>
    )}
    </div>
    </>
  )
}

export default FindProjects