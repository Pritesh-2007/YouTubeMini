import { FaYoutube } from "react-icons/fa";

import { RxHamburgerMenu } from "react-icons/rx";
import { GoSearch } from "react-icons/go";
import { IoMdMic } from "react-icons/io";
import { MdOutlineVideoCall } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
const Navbar=({toggleSidebar})=>{
    const[profile,setprofile]=useState('https://clipground.com/images/user-icon-vector-png-6.png');
    const[navbarmodel,setnavbarmodel]=useState(false)
    const[Islogin,setIslogin]=useState(false);
    const togglesidenav=()=>{
        toggleSidebar();
    }   
        const navigate=useNavigate();
        const showprofile=()=>{ 
        let userid=localStorage.getItem("userId");  
        navigate(`/profile/${userid}`);  
        setnavbarmodel(false);
         }
        const[login,setlogin]=useState(false);
        const handleLogin=(val)=>{
            if(val==="login")
            {
                setlogin(true);
                setnavbarmodel(false);
            }
        }
        async function logoutdata (){
            try {
              await  fetch("http://localhost:4000/auth/logout",{
                    method:'POST'
                })
            } catch (error) {
                console.log(error)
                
            }
        }
        const handleLogout=(val)=>{
            if(val==="logout")
            {
                localStorage.clear();
                setnavbarmodel(false);
            }
            logoutdata();
            setTimeout(()=>{
                navigate("/");
                window.location.reload();
            },2000)

        }

        function closemodel()
        {
            setlogin(false);
        }
        useEffect(()=>{
            let profilepic = localStorage.getItem("userProfile");
            setIslogin(localStorage.getItem("userId")!==null?true:false);
            if(profilepic!==null)
            {
                setprofile(profilepic);
            }
        },[]);
return(
    <>
    <div className="fixed flex px-5 w-full bg-slate-200 h-16 justify-between top-0 z-10 items-center">
    <div className="nav-left flex gap-2.5">
    <RxHamburgerMenu className="flex w-7 h-7 justify-center items-center" onClick={togglesidenav}/>
    <Link to="/">
    <div className="youtube flex cursor-pointer">
    <FaYoutube className="text-red-500 flex w-7 h-7 justify-center items-center"/>
    <div className="flex w-7 h-7 font-bold">YouTube</div>
    </div>
    </Link>
    </div>
    <div className="nav-center flex w-1/2 gap-2.5">
    <div className="searchbox flex w-4/5">
    <input type="text" placeholder="Search.." className="w-full rounded-l-3xl border outline-none pl-8 h-9 focus:border-none "/>
    <div className="serch-icon w-16 rounded-r-3xl bg-slate-100 flex justify-center items-center">
    <GoSearch className="text-lg"/>
    </div>
    </div>
    <div className="mike flex justify-center items-center rounded-full w-9 h-9 bg-slate-100 cursor-pointer">
    <IoMdMic/>
    </div>
    </div>
    <div className="navbar-right flex gap-2.5 ">
    <Link to="/videoUpload">
    <MdOutlineVideoCall  className="w-7 h-7 cursor-pointer"/>
    </Link>
    <IoMdNotificationsOutline  className="w-7 h-7 cursor-pointer"/>
    <div className="profile overflow-hidden flex justify-center items-center rounded-full w-7 h-7 bg-slate-100 cursor-pointer">
    <img  className="cursor-pointer w-full h-full  " alt="logo" src={profile} onClick={()=>{setnavbarmodel(!navbarmodel)}}/>
    </div>
    {navbarmodel && <div className="navbar-model absolute top-14 w-full bg-slate-300 z-20">
    {Islogin && <div className="navbar-model-list p-2.5 hover:bg-slate-200 cursor-pointer" onClick={showprofile}>
        Profile
    </div>}
    
    {!Islogin &&
    <div className="navbar-model-list p-2.5 hover:bg-slate-200 cursor-pointer" onClick={()=>{handleLogin("login")}}>
        Login
    </div>
    }
    {Islogin && <div className="navbar-model-list p-2.5 hover:bg-slate-200 cursor-pointer" onClick={()=>{handleLogout("logout")}}>
        Logout
    </div>}

    </div>
    }
    </div>
    {
        login && <Login IsLogin={closemodel}/>
    }
    </div>  
    </>
)
}
export default Navbar;