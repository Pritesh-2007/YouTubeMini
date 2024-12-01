import React from 'react'
import { HiOutlineHome } from "react-icons/hi2";
import { SiYoutubeshorts } from "react-icons/si";
import { MdOutlineSubscriptions } from "react-icons/md";
import { GoHistory } from "react-icons/go";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { GoVideo } from "react-icons/go";
import { RxScissors } from "react-icons/rx";
import { BiSolidUserAccount } from "react-icons/bi";
import { IoIosArrowForward } from 'react-icons/io';
import { Link } from 'react-router-dom';
export default function SideNavbar({isOpen}) {
  return (
    <div className={`fixed flex-1 top-14 bottom-0  left-0 md:w-64 bg-slate-200  transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 overflow-hidden `}>
        <div className="top flex flex-col mt-3">
        <Link to="/">
            <div className="home-top-options flex gap-5 items-center px-2 py-2 hover:bg-slate-300 cursor-pointer rounded-xl">
            <HiOutlineHome className='text-2xl'/>
            <div className=''>Home</div>
        </div>
        </Link>
        <div className="home-top-options flex gap-5 items-center px-2 py-2 hover:bg-slate-300 cursor-pointer rounded-xl">
            <SiYoutubeshorts className='text-2xl'/>
            <div className=''>Shorts</div>
        </div>
        <div className="home-top-options flex gap-5 items-center px-2 py-2 hover:bg-slate-300 cursor-pointer rounded-xl">
            <MdOutlineSubscriptions className='text-2xl'/>
            <div className=''>Subsciptions</div>
        </div>
        </div>
        <div className="mid-div flex-col gap-4">
        <div className="home-top-options flex gap-5 items-center px-2 py-2  cursor-pointer rounded-xl">
            <div className=''>You</div>
            <IoIosArrowForward/>
        </div>
        <div className="home-top-options flex gap-5 items-center px-2 py-2 hover:bg-slate-300 cursor-pointer rounded-xl">
            <GoHistory className='text-2xl'/>
            <div className=''>History</div>
        </div>
        <div className="home-top-options flex gap-5 items-center px-2 py-2 hover:bg-slate-300 cursor-pointer rounded-xl">
            <MdOutlinePlaylistPlay className='text-2xl'/>
            <div className=''>Playlists</div>
        </div>
        <div className="home-top-options flex gap-5 items-center px-2 py-2 hover:bg-slate-300 cursor-pointer rounded-xl">
            <MdOutlineWatchLater className='text-2xl'/>
            <div className=''>Watch Later</div>
        </div>
        <div className="home-top-options flex gap-5 items-center px-2 py-2 hover:bg-slate-300 cursor-pointer rounded-xl">
            <AiOutlineLike className='text-2xl'/>
            <div className=''>Liked Videos</div>
         </div>
         <div className="home-top-options flex gap-5 items-center px-2 py-2 hover:bg-slate-300 cursor-pointer rounded-xl">
            <GoVideo className='text-2xl'/>
            <div className=''>Your  Videos</div>
         </div>
         <div className="home-top-options flex gap-5 items-center px-2 py-2 hover:bg-slate-300 cursor-pointer rounded-xl">
            <BiSolidUserAccount className='text-2xl'/>
            <div className=''>Your Channel</div>
         </div>
         <div className="home-top-options flex gap-5 items-center px-2 py-2 hover:bg-slate-300 cursor-pointer rounded-xl">
            <RxScissors className='text-2xl'/>
            <div className=''>Your Clips</div>
         </div>
        </div>
        <div className="low-div flex flex-col">
        <div className="home-top-options flex gap-5 items-center px-2 py-2  cursor-pointer rounded-xl">
            <div className='font-bold'>Subsciptions</div>
            
        </div>
        <div className="home-top-options flex gap-5 items-center px-2 py-2 hover:bg-slate-300 cursor-pointer rounded-xl">
        <div className="profile overflow-hidden flex justify-center items-center rounded-full w-7 h-7 bg-slate-100 cursor-pointer">
        <img  className="cursor-pointer" alt="logo" src="https://static.abplive.com/frontend/img/ampstory/ABP_NEWS_LOGO_1080x1920.jpg"/>
        </div>
        <div className=''>Abp Live</div>
        </div>
        <div className="home-top-options flex gap-5 items-center px-2 py-2 hover:bg-slate-300 cursor-pointer rounded-xl">
        <div className="profile overflow-hidden flex justify-center items-center rounded-full w-7 h-7 bg-slate-100 cursor-pointer">
        <img  className="cursor-pointer " alt="logo" src="https://yt3.ggpht.com/ytc/AIdro_lEOsOKSwfkzCB5bj1mTBIKOG7rBJmipaGnWMtcUnEF0I6J=s88-c-k-c0x00ffffff-no-rj"/>
        </div>
        <div className=''>T-Series Bhakti</div>
        </div>
        <div className="home-top-options flex gap-5 items-center px-2 py-2 hover:bg-slate-300 cursor-pointer rounded-xl">
        <div className="profile overflow-hidden flex justify-center items-center rounded-full w-7 h-7 bg-slate-100 cursor-pointer">
        <img  className="cursor-pointer " alt="logo" src="https://i.imgur.com/IEQZ7Dk.jpg"/>
        </div>
        <div className=''>Star Sports</div>
        </div>
        </div>
    </div>
  )
}
