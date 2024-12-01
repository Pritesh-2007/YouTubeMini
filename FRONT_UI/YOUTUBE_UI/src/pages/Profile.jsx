import React, { useEffect, useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom';

export default function Profile({isOpen}) {

const[data,setdata]=useState([]);
        const {id}=useParams();
        const[user,setuser]=useState({});

        async function fetchprofiledata()
        {
            try{
            console.log(id)
            const response=await fetch(`http://localhost:4000/videoapi/getvideoofchannel/${id}`)
            const result=await response.json();
            
            setuser(result.data[0]?.user)
            setdata(result.data)    
            }
            catch(error)
            {
                console.log(error)
            }
        }

        useEffect(() => { 
          if (data.length === 0) 
            { 
            console.log("in if block");
             async function fetchUserChannel() 
             {
               try
                {
                  
              console.log("empty he"); 
              const response = await fetch(`http://localhost:4000/videoapi/userchannel/${id}`); 
              const result = await response.json();
               console.log(result); 
               setuser(result.data); 
              } 
              catch (error) {
                 console.log(error);
                 }
                 }
                  fetchUserChannel();
                 }
                 }, [data, id])
useEffect(()=>{
    fetchprofiledata();
},[])


  return (
    <>
    
    <div className={`profilemain flex flex-col flex-1  px-2 mt-10  ${isOpen ? 'ml-64':'ml-0'}`}>
        <div className="profile-top-section  mt-8 p-5 flex">
            <div className="chanelogo md:w-40 md:h-40 w-40  h-24 rounded-full cursor-pointer">
                <img src={user?.profilepic} className="w-full h-full rounded-full"/>
            </div>
            <div className="profilesectionAbout flex flex-col gap-2.5 px-8">
              <div className="AboutName text-4xl font-semibold">{user?.channelName}</div>  
              <div className="profileSection_info text-lg ">
                {user?.userName} .{data?.length} Videos
              </div>
              <div className="profileSection_info text-lg">
                {user?.about}
              </div>
            </div>
        </div>
        <div className="profile-videos w-full mt-10">
        <div className="vidtitle flex items-center border-b border-solid border-gray-500 text-xl font-semibold pb-2.5">
         Videos &nbsp; <IoIosArrowForward/>   
        </div>
        <div className={`profilevideos flex flex-col md:grid  ${isOpen?'md:grid-cols-customgrid md:gap-x-10 ':'md:grid-cols-customgrid4 md:gap-x-20'} box-border md:gap-y-20 md:pl-10 pt-20 pb-5 items-center gap-7`}>
                {
                data?.map((items,index)=>{
                    return(
                <Link to={`/video/${items?._id}`}>
                <div key="index" className="profilevideosblock flex flex-col">
                <div className="blockThubnail flex w-96 h-36 cursor-pointer">
                <img  className="w-full" src={items?.thumbnail}/>
                </div>
                <div className="profile-block-details flex flex-col w-full">
                <div className="blockdetalName w-full text-lg font-semibold">{items?.title}</div>
                <div className="blockdetailAbout text-sm">created At {items?.createdAt?.slice(0,10)}</div>
                </div>
                </div>
                </Link>
                    )
                })      
            }
        </div>
        </div>
    </div>
   
  
    </>
  )
}
