import React, { useEffect, useState } from 'react';
import { FaUpload, FaYoutube } from "react-icons/fa";
import { RiVideoUploadLine } from "react-icons/ri";
import { Ring } from "react-awesome-spinners";
import { Link, useNavigate } from 'react-router-dom';
import { toast ,ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css';

export default function VideoUploadPage({ toggleSidebar }) {
  const [loading, setLoading] = useState(false);
  const [videoloading, setvideoLoading] = useState(false);
  const[Isloggedin,setIsloggedin]=useState(false)
  useEffect(() => {
    toggleSidebar(false);
  }, []); // Added toggleSidebar as a dependency
  const navigate=useNavigate();
  useEffect(()=>{
    let userid=localStorage.getItem("userId");
    if(userid==null)
    {
      navigate("/");
    }
    else{
      setIsloggedin(true);
    }
  },[])
 
    

  const [thumbnailurl, setthumbnaillink] = useState("https://res.cloudinary.com/dn0p3vjf9/image/upload/v1732859459/ysnop4ynowarddmxwutf.jpg");
  const [videourl, setvideolink] = useState("https://res.cloudinary.com/dn0p3vjf9/image/upload/v1732859459/ysnop4ynowarddmxwutf.jpg");
  const [uploadmsg, setuploadmsg] = useState("");
  const [viduploadmsg,setviduploadmsg]=useState("");
  const [uploadfields, setuploadfields] = useState({
    "title": "",
    "description": "",
    "videocategory": "",
    "thumbnail": "",
    "videolink": ""
  });

  function handlechange(e, field) {
    setuploadfields({
      ...uploadfields,
      [field]: e.target.value
    });
  }
  async function uploadfile(e, type,field) {
    setLoading(true);
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'YOUTUBE_CLONE');
    const options = {
      method: 'POST',
      body: data,
    };

    let siteurl = `https://api.cloudinary.com/v1_1/dn0p3vjf9/${type}/upload`;
    try {
      const response = await fetch(siteurl, options);
      setLoading(false);
      const clddata = await response.json();
      if (type === "image") {
        setthumbnaillink(clddata.url);
        setuploadfields({
          ...uploadfields,
         [field]: clddata.url
        });
        setuploadmsg("Uploading Succesfull");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setuploadmsg("Uploading failed!");
    }
  }

  async function uploadvideofile(e, type,field) {
    setvideoLoading(true);
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'YOUTUBE_CLONE');
    const options = {
      method: 'POST',
      body: data,
    };

    let siteurl = `https://api.cloudinary.com/v1_1/dn0p3vjf9/${type}/upload`;
    try {
      const response = await fetch(siteurl, options);
      setvideoLoading(false);
      const clddata = await response.json();
      setvideolink(clddata.url);
      setuploadfields({
        ...uploadfields,
        [field]: clddata.url
      });
      setviduploadmsg("Uploading Succesfull");
    } catch (error) {
      console.log(error);
      setvideoLoading(false);
      setviduploadmsg("Uploading failed!");
    }
  }
async function sendformdata(e)
{
  e.preventDefault();
  try {
    const response=await fetch("http://localhost:4000/videoapi/uploadvideo",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(uploadfields),
      credentials: 'include'
    })
    console.log(response)
    if(response.ok)
    {
      toast("Data Uploaded!")
      setTimeout(()=>{
        navigate("/");
      },1000)
    }
    else{
    toast.warn("Something went wrong try to relogin!")
    setTimeout(()=>{
      navigate("/");
    },1000)
    }
  } catch (error) {
    console.log(error)
  }
}

  return (
    
    <div className="VideoUpload font-seri w-full  flex flex-col relative items-center justify-center " style={{ height: '100vh' }}>
       <style>
        {`
         .uploadBox::-webkit-scrollbar { display: none; } 
         .uploadBox { -ms-overflow-style: none; 
         /* IE and Edge */ scrollbar-width: none; /* Firefox */
        }`}
      </style>
      <div className="uploadBox  flex flex-col bg-slate-100 pb-2 overflow-scroll" style={{height:"80%", width: '45%', borderRadius: '5px', marginTop: '26px', boxShadow: '0.5px 0.5px 8px gray' }}>
        <div className="uploadVidTitle flex w-full justify-center items-center mt-5">
          <FaYoutube className='text-red-500 text-5xl' />
          Upload Video
        </div>
        <form onSubmit={(e)=>{sendformdata(e)}}   className="uploadform flex h-full flex-col gap-8 items-center mt-8">
          <input type="text" placeholder="Title Of Video." value={uploadfields.title} className="rounded-md box-border py-0 px-5" style={{ height: '45px', width: '70%', fontSize: '16px' }}
          required  onChange={(e) => { handlechange(e, "title") }} />
          <textarea type="text" placeholder="Short Description Of Video." value={uploadfields.description} className="rounded-md box-border py-0 px-5" style={{ height: '65px', width: '70%', fontSize: '16px' }}
          required  onChange={(e) => { handlechange(e, "description") }} />
          <input type="text" placeholder="Enter Category" value={uploadfields.videocategory} className="rounded-md box-border py-0 px-5" style={{ height: '45px', width: '70%', fontSize: '16px' }}
          required  onChange={(e) => { handlechange(e, "videocategory") }} />
          <div class="flex gap-4">
          <div className="flex items-center justify-center">
            <label className="flex flex-col items-center px-2 py-4 bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white">
              <FaUpload className="text-3xl" />
              <span className="mt-2 text-base leading-normal">Select an image</span>
              <input type="file" className="hidden" accept="image/*" onChange={(e) => { uploadfile(e, "image","thumbnail") }} />
              {loading ? <Ring /> : thumbnailurl && uploadmsg}
            </label>
          </div>
          <div className="flex items-center justify-center">
            <label className="flex flex-col box-border items-center px-2 py-4 bg-white text-orange-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-orange-500 hover:text-white">
              <RiVideoUploadLine className="text-3xl" />
              <span className="mt-2 text-base leading-normal">Select a Video</span>
              <input type="file" accept="video/mp4, video/webm, video/*" className='hidden' onChange={(e) => { uploadvideofile(e, "video","videolink") }} />
              {videoloading ? <Ring /> : videourl && viduploadmsg}
            </label>
          </div>
          </div>
          <div className="divbtn flex justify-center gap-8 mt-6">
            <button type="submit" className="uploadbtn px-5 py-2.5 cursor-pointer rounded-md bg-green-500 text-white hover:opacity-65">Upload</button>
           <Link to="/"><div className="homebtn px-5 py-2.5 cursor-pointer rounded-md bg-yellow-500 text-white hover:opacity-65">Home</div></Link>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
}
