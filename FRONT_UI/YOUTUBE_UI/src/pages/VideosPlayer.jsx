import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { FaRegThumbsUp } from "react-icons/fa";
import { FaRegThumbsDown } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
export default function VideosPlayer({ toggleSidebar }) {
    useEffect(() => {
        toggleSidebar(false);
    }, []);
    const { id } = useParams();
    const videoRef = useRef(null);
    useEffect(() => { if (videoRef.current) { videoRef.current.play(); } }, []);
    const [comment, setcomment] = useState("");
    const [viddata, setviddata] = useState({});
    const [vidlink, setvidlink] = useState("")
    const [recommendedvids, setrecommendedvids] = useState([]);
    const [usercomments, setusercomments] = useState([]);
    const[loggeduser,setloggeduser]=useState();
    async function videoByid() {
        let response = await fetch(`http://localhost:4000/videoapi/getvideobyid/${id}`);
        const result = await response.json();
        setviddata(result.data);
        setvidlink(result?.data?.videolink)
    }
    async function getcommentsonvideoByid() {
        let response = await fetch(`http://localhost:4000/commentapi/commentBYvid/${id}`);
        const result = await response.json();
        setusercomments(result?.data);
    }
    useEffect(() => {
        videoByid();
        getcommentsonvideoByid();
        videosuggetion();

    }, [])
    async function deletecomments(cid)
    {
        try{
            let response= await fetch(`http://localhost:4000/commentapi/deletecomment/${cid}`,
            {
                method:"DELETE",
                credentials: 'include' //this has been included to fetch cookeis store data 
            });
            if(response.ok)
            {
                 toast("comment deleted");
                setTimeout(()=>{
                window.location.reload();    
                },600)
            }
            else{
                toast.error("comment not deleted");
            }

        }
        catch(error)
        {
            console.log(error.message)
        }
    }
    // useEffect(()=>{
    //     videosuggetion();
    //   },[])
    async function videosuggetion() {
        try {
            let response = await fetch("http://localhost:4000/videoapi/videorecommend");
            let data = await response.json();
            setrecommendedvids(data.data);
        } catch (error) {

        }

    }
    async function handlecomment() {
        const comments = {
            "video": id,
            "message": comment
        }
        try {
            if(localStorage.getItem("userId")==null)
            {
                return toast.warning("Please Login first!");
            }
            const res = await fetch("http://localhost:4000/commentapi/addcomment",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(comments),
                    credentials: 'include' //this has been included to fetch cookeis store data 
                });
            let logs = await res.json();
            setusercomments(...usercomments, comments)

            if (res.ok) {
                toast.success("comment posted");
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            }
        }
        catch (error) {
            console.log("in catch", error);
            toast.error("comment failed! try to relogin");
        }

    }
   function displaymessage(id)
    {
        setTimeout(()=>{window.location.reload();},500)
       
    }
    const[selfpic,setselfpic]=useState('https://img.freepik.com/premium-vector/user-profile-icon-vector-16_666870-1655.jpg');
   
    useEffect(()=>{
        let user=localStorage.getItem("userId")
        if(user!==null)
            {
                let propic=localStorage.getItem("userProfile")
                setselfpic(propic);
                setloggeduser(localStorage.getItem("userId"));
            }  
    },[])
    async function addlike()
    {
        try{
       let res= await fetch(`http://localhost:4000/videoapi/updatelike/${id}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
         credentials: 'include' //this has been included to fetch cookeis store data 
        });
        if(res.ok)
        {
           toast.info("liked!")
            window.location.reload();
        }

    }
    catch(error)
    {
        console.log(error.message)
    }
    }
    async function dislike()
    {
        try{
       let res= await fetch(`http://localhost:4000/videoapi/dislike/${id}`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
         credentials: 'include' //this has been included to fetch cookeis store data 
        });
        if(res.ok)
        {
           toast.info("liked!")
            window.location.reload();
        }

    }
    catch(error)
    {
        console.log(error.message)
    }
    }
    return (
        <div className='video flex  w-full p-2.5 px-3.5 mt-16'>
            <div className="videoplaysection flex flex-col h-full" style={{ "width": "200%" }}>
                <div style={{ "width": "100%", "height": "50%" }}>
                    {
                        vidlink &&
                        <video ref={videoRef} controls autoPlay  className="h-full w-full" style={{ objectFit: 'contain', backgroundColor: 'black' }}>
                            <source src={vidlink} type="video/mp4" />
                            <source src={vidlink} type="video/webmb" />
                            Your Browser Not Support video
                        </video>
                    }
                </div>
                <div className="videoabout flex">
                    <div className="video_youtubeabout flex flex-col flex-grow">
                        <div className="videoyTTitle text-xl font-bold">
                            {viddata?.title}
                        </div>
                        <div className="YT_ProfileBlock flex justify-between items-center  mt-2.5">
                            <div className="YT_ProfileBlock_Left flex gap-3.5 justify-center items-center">
                                <div className="YT_ProfileBlockL_IMG w-14 h-14  cursor-pointer">
                                    <Link to={`/profile/${viddata?.user?._id}`}> <img className="rounded-full w-full h-full " src={viddata?.user?.profilepic} /></Link>
                                </div>
                                <div className="leftSubView flex flex-col">
                                    <div className="YT_PROFILEnAME text-lg font-semibold">{viddata?.user?.channelName}</div>
                                    <div className="YT_ProfileBlock_Right text-sm">{(viddata?.user?.createdAt)?.slice(0, 10)}</div>
                                </div>
                                <div className="divSubscribe bg-gray-200  flex font-bold p-0 px-4 items-center h-9 rounded-2xl cursor-pointer text-sm justify-center">
                                    Subscribe
                                </div>
                            </div>
                            <div className="YT_ProfileBlock_Right text-xl flex gap-2.5 justify-center items-center box-border bg-gray-200 cursor-pointer px-4 rounded-2xl">
                                <div className="likesbtn flex justify-center items-center gap-2.5">
                                    <button onClick={()=>{addlike()}}><FaRegThumbsUp/></button>
                                    <div className="likecount">{viddata?.like}</div>
                                </div>
                                <div className="divider h-5 w-1 border-2 border-solid bg-slate-600" />
                                <div className="likesbtn flex justify-center items-center gap-2.5">
                                  <button onClick={()=>{dislike()}} ><FaRegThumbsDown/></button>
                                    <div className="likecount">{viddata?.dislike}</div>
                                </div>

                            </div>
                        </div>
                        <div className="YTAbout bg-gray-200 flex flex-col p-2.5 w-full gap-2.5 mt-2.5">
                            <div className="ytdate">{(viddata?.user?.createdAt)?.slice(0, 10)}</div>
                            <div className="Ytdesc">{viddata?.description}</div>
                        </div>
                        <div className="YTCOMMENTSECTION">
                            <div className="YTCOMTITLE mt-2 mb-2">
                                {usercomments?.length} Comments
                            </div>
                            <div>
                            <div className="selfcomment  flex  gap-2">
                                <div className="addcomment w-full flex flex-col ">
                                   <div className="div flex items-center"> 
                                <img className="rounded-full w-14 h-14 flex " src={selfpic!==null? selfpic :"wow"} />
                                    <input type="text" value={comment} placeholder="Add a comment..." className="w-full h-9  border-b border-solid border-black p-4 focus:outline-none"
                                        onChange={(e) => { setcomment(e.target.value) }} />
                                       </div> 
                                    <div className="commentoption flex justify-end gap-4 mt-3.5">
                                        <div className="cancle border border-solid border-black p-2 cursor-pointer rounded-3xl hover:bg-gray-100">Cancle</div>
                                        <div className="comment border border-solid border-black p-2 cursor-pointer rounded-3xl hover:bg-gray-100" onClick={handlecomment}>Comment</div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="pepolecomment flex flex-col w-full mt-4 gap-y-5 ">
                                {
                                    usercomments.length > 0 ?
                                        usercomments.map((items, index) => {
                                            return (
                                                <div key={index} className="selfcomment flex h-9 gap-2.5">
                                                    <img className="rounded-full w-9 h-9 " src={items?.user?.profilepic} />
                                                    <div className="flex flex-col">
                                                        <div className="othercommentsectionheader flex gap-2.5">
                                                            <div className="commentname text-sm font-semibold">{items?.user?.channelName}</div>
                                                            <div className="commenttimming text-sm">{items?.createdAt?.slice(0, 10)}</div>
                                                        </div>
                                                        <div className="desccomment">
                                                            {items?.message}
                                                        </div>
                                                    </div>
                                                   
                                                    {
                                                     items?.user?._id ===loggeduser ?  
                                                    <MdDelete className='flex text-gray-600  items-center justify-center text-2xl mt-3.5' onClick={()=>{deletecomments(items?._id)}}/>
                                                    :""
                                                    }
                                                </div>
                                            )
                                        })
                                       
                                        : "No comments"
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="videosuggestion p-2.5 px-3.5  flex flex-col w-full gap-3.5">
                {
                    recommendedvids?.map((items, index) => {
                        return (
                                <Link to={`/video/${items?._id}`}>
                                <div key={index} className="suggestion_block flex cursor-pointer  bg-slate-100"
                                 onClick={()=>{displaymessage(items?._id)}}
                                 >
                                    <div className="thumbnail w-56 h-full">
                                        <img className="w-44" src={items?.thumbnail} />
                                    </div>
                                    <div className="sugesstion_about flex flex-col gap-1">
                                        <div className="suggestedTitle font-semibold mb-1 text-lg"> {items?.title}</div>
                                        <div className="sugeestAboutProfile text-sm">{items?.userData?.channelName}</div>
                                        <div className="sugeestAboutProfile text-sm">{items?.createdAt?.slice(0,10)}</div>
                                    </div>
                                </div>
                                </Link>
                                
                          )
                    })
                }
            </div>
            <ToastContainer />
        </div>
    )
}
