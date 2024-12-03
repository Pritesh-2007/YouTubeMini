import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function Home({ isOpen }) 
{
  
  const [randomcategory, setrandomcategory]=useState(['All']);
  const [videodata, setvideodata] = useState([]);
  useEffect(() => {
    try {
      async function callvideos() {
        const response = await fetch("http://localhost:4000/videoapi/getvideos");
        const data = await response.json();
        setvideodata(data.data);

      }
      callvideos();
    }
    catch (error) {
     console.log(error)
    }
    
  }, []);
  
  
  const cats=videodata?.map((item)=>{
   return item.videocategory;
  })

  useEffect(()=>{
  const uniqueValues1 = [...new Set(cats)];
    setrandomcategory(uniqueValues1);
    randomcategory
  },[videodata]);

  return (
    <div className={`Home ${isOpen ? 'left-56 w-11/12 ' : 'left-0 w-full '} h-full overflow-y-scroll fixed flex flex-col box-border`}>
      <style>
        {`
         .hompage-options::-webkit-scrollbar { display: none; } 
         .hompage-options { -ms-overflow-style: none; 
         /* IE and Edge */ scrollbar-width: none; /* Firefox */
        }`}
      </style>

          <div className={`hompage-options relative top-5 right-0 flex w-full gap-2.5 px-12`}>
        {randomcategory.map((cate, index) => {
          return (
            <div key={index} className='home-category bg-gray-200 flex flex-grow-0 flex-shrink-0 h-7 px-3 pb-2 rounded-xl font-semibold hover:bg-slate-300 ' >
              {cate}
            </div>
          )
        })}

      </div>
        <div className={`V_Grid md:grid ${isOpen ? 'md:grid-cols-customgrid' : 'md:grid-cols-customgrid4'}  box-border md:gap-x-10 md:pl-10 md:pt-20 md:pb-5 p-12 `}>
      {
        videodata?.map((items, index) => {
          return(
          <Link to={`/video/${items._id}`}>  
        <div className="Y_videos flex flex-col box-border h-80 cursor-pointer">
          <div className="thumbnail-box w-full relative box-border h-52">
            <img className="w-full h-full rounded-xl" src={items?.thumbnail} />
            {/* <div className="thumbnail-timing absolute right-0 bottom-0 pr-1">5:05</div> */}
          </div>
          <div className=' titlebox flex pt-2.5  '>
            <div className="profilebox w-10 h-10 flex justify-center items-center rounded-full">
              <img className="rounded-full w-full h-full" src={items?.user?.profilepic} />
            </div>
            <div className="div flex flex-col pl-2">
              <div className="Title font-bold">{items?.title}</div>
              <div className="ChannelName  text-gray-600">{items?.channelName}</div>
              <div className="div flex justify-between">
                <div className="views font-light text-gray-600">{items?.like } Likes &nbsp; </div>
                <div className="UploadTiming font-light text-gray-600">{items?.createdAt?.slice(0,10)}</div>
              </div>
            </div>
          </div>

        </div>
        </Link>
      
          )
        })
      }
      </div>
    </div>
  )
}
