import React from 'react'
import { FaFileUpload, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { CgUserlane } from "react-icons/cg";
import { useEffect } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { useState } from 'react';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/ReactToastify.css';
export default function SignUpPage({ toggleSidebar }) {
    useEffect(() => {
        toggleSidebar(false);
    }, []);
    const closemodel = () => {
        //IsLogin(false);
    }
    const [imageurl, seturl] = useState("https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?rs=1&pid=ImgDetMain");
    const [fileName, setFileName] = useState('');
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
        }
    };
    const [Signupfields, setSignupfields] = useState({
        "userName": "",
        "password": "",
        "channelName": "",
        "about": "",
        "profilepic": ""
    });
    function handlechangeinput(e, field) {
        setSignupfields(
            {
                ...Signupfields, [field]: e.target.value
                
            }
        
        )
        console.log(Signupfields)
    }
    async function uploadfile(e,field) {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        console.log(files);
        data.append('upload_preset', 'YOUTUBE_CLONE');
        const options = {
            method: 'POST',
            body: data,
        };
        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dn0p3vjf9/image/upload", options)
            console.log(response);
            const clddata = await response.json();
          //  console.log(clddata.url);

            await seturl(clddata.url);
            console.log(imageurl)
            setSignupfields({
                
                ...Signupfields, [field]: clddata.url
            })

            console.log(Signupfields)
        } catch (error) {
            console.log(error)
        }
    }
    async function handleform(e)
    {   

        console.log("function called");
        console.log(Signupfields)
        e.preventDefault();
        try{
      let response=await fetch("http://localhost:4000/auth/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(Signupfields)
        })
        if(response.status===201)
        {
        console.log("uploaded successfully")
        toast.success("Sign up succesfull!")
        }
        if(response.status===400)
            {
                toast.warning("user already exist",{position: toast.POSITION.BOTTOM_RIGHT})
            }
    }
        catch(error)
        {
            toast.error("something went wrong");
        }
    }
    return (
        <div className="w-full h-screen fixed z-30 flex justify-center items-center overflow-scroll" style={{ backgroundColor: 'rgb(0, 0, 0,0.7)' }}>
                <style>
                {`
                .card::-webkit-scrollbar { display: none; } 
                .card { -ms-overflow-style: none; 
                /* IE and Edge */ scrollbar-width: none; /* Firefox */
                }`}
              </style>
            <div className="card md:w-2/5 md:h-3/4 mt-24 pt-5 bg-slate-100 box-border flex flex-col items-center overflow-scroll ">
                <div className="Title flex flex-col font-semibold  gap-2.5">
                    <MdAccountCircle className='text-orange-500 text-5xl' />
                    <p>Sign Up</p>
                </div>
                <form onSubmit={(e)=>{handleform(e)}} className="loginform flex h-full  w-full flex-col gap-8 items-center mt-8">
                    <input type="text" placeholder="UserName" className="rounded-md box-border py-0 px-5" style={{ height: '45px', width: '70%', fontSize: '16px' }}
                    required    onChange={(e) => { handlechangeinput(e, "userName") }}
                    />
                    <input type="password" placeholder="Password" className="rounded-md box-border py-0 px-5" style={{ height: '45px', width: '70%', fontSize: '16px' }}
                     required   onChange={(e) => { handlechangeinput(e, "password") }}
                    />
                    <input type="text" placeholder="Channel Name" className="rounded-md box-border py-0 px-5" style={{ height: '45px', width: '70%', fontSize: '16px' }}
                    required    onChange={(e) => { handlechangeinput(e, "channelName") }}
                    />
                    <textarea type="text" placeholder="About Your Channel" className="rounded-md box-border py-0 px-5" style={{ height: '65px', width: '70%', fontSize: '16px' }}
                    required    onChange={(e) => { handlechangeinput(e, "about") }}
                    />
                    <div className="bottom-grp flex flex-col md:flex-row gap-y-4 md:items-center md:justify-center">
                        <div className="flex  h-full items-center justify-center gap-x-10">
                            <label className="flex flex-col items-center  bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-500 hover:text-white p-3">
                                <FaFileUpload className="text-3xl" />
                                <span className="mt-2 text-base leading-normal">
                                    {fileName || "Select a file"}
                                </span>
                                <input type="file" className="hidden" accept="image/*" onChange={(e) => { uploadfile(e,"profilepic") }} required/>
                            </label>
                            <div className="YT_ProfileBlockL_IMG w-14 h-14 rounded-full cursor-pointer">
                                {

                                    imageurl && <img className="rounded-full w-full h-full " src={imageurl} />

                                }
                            </div>
                        </div>
                        <div className="divbtn h-full flex items-baselines gap-x-10 md:ml-5">
                            
                                <button type="submit" className="homebtn px-5 py-2.5 cursor-pointer rounded-md bg-orange-500 text-white hover:opacity-85" >Sign Up</button>
                           
                            <Link to="/">
                                <div className="homebtn px-5 py-2.5 cursor-pointer rounded-md bg-lime-500 text-white hover:opacity-85 md:h-full md:flex md:items-center">Home</div>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
    )
}
