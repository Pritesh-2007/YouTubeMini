import React, { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function Login({ IsLogin }) {
    const navigate = useNavigate();
    const closemodel = () => {
        IsLogin(false);
    }
    const [logindata, setlogindata] = useState({
        "userName": "",
        "password": ""
    });
    function handlechangeinput(e, field) {
        setlogindata(
            {
                ...logindata, [field]: e.target.value
            }
        )
    }
    async function handlelogin() {

        try {

            const response1 = await fetch("http://localhost:4000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(logindata),
                credentials: 'include'
            });
            if (!response1.ok) { throw new Error(`HTTP error! status: ${response1.status}`);}

            const response=await response1.json();

            if (response.status === 404) {
               return toast.error("User not Exist")
            }
            else if (response.status === 401) {
                return toast.error("Invalid Credentials!")
            }
            else  {
                toast.success("Login Successfull!")
                localStorage.setItem("token",response.token);
                localStorage.setItem("userId",response.data._id);
                localStorage.setItem("userProfile",response.data.profilepic);
                setTimeout(()=>{
                    window.location.reload();

                },700);
            }
            // else{
            //     toast.error("Login failed!") 
            // }
        }
        catch (error) {
            toast.error("Invalid credentials")
            console.log(error)
        }

    }
    return (
        <div className="w-full h-screen fixed left-0 bottom-0 flex justify-center items-center" style={{ backgroundColor: 'rgb(0, 0, 0,0.7)' }}>
            <div className="card w-2/5 h-3/5 mt-24 bg-slate-100 box-border flex flex-col items-center p-14">
                <div className="Title flex flex-col font-semibold  gap-2.5">
                    <FaUser className='text-blue-500 text-5xl' />
                    <p>Login</p>
                </div>
                <div className="loginform flex h-full  w-full flex-col gap-8 items-center mt-8">
                    <input type="text" value={logindata.userName} placeholder="UserName" className="rounded-md box-border py-0 px-5 w-full" style={{ height: '100%',  fontSize: '16px' }}
                        required onChange={(e) => { handlechangeinput(e, "userName") }}
                    />
                    <input type="password" value={logindata.password} placeholder="Password" className="rounded-md box-border py-0 px-5 w-full h-full" style={{fontSize: '16px' }}
                        required onChange={(e) => { handlechangeinput(e, "password") }}

                    />
                    <div className="divbtn flex justify-center gap-6 mt-6">
                        <button className="uploadbtn px-5 py-2.5 cursor-pointer rounded-md bg-blue-500 text-white hover:opacity-85"
                            onClick={(e) => { handlelogin(e) }} >Login</button>
                        <Link to="/SignUp">
                            <div className="homebtn px-5 py-2.5 cursor-pointer rounded-md bg-orange-500 text-white hover:opacity-85" onClick={closemodel}>Sign Up</div>
                        </Link>
                        <div className="homebtn px-5 py-2.5 cursor-pointer rounded-md bg-red-500 text-white hover:opacity-85" onClick={closemodel}>Cancel</div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
