"use client";

import Link from "next/link";
import { useState } from "react"; 


export default function LoginForm() {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault(); }



  return <div className="grid place-items-center h-screen">
    <div className="shadow-lg p-5 rounded-lg border-t-4 border-gray-400">
      <h1 className="text-xl font-bold my-4">Login</h1>

      <form onSubmit={handleSubmit}className="flex flex-col gap-3">
        <input onChange={(e) => setUserName(e.target.value)} type="text"  placeholder="user name" />
        <input onChange={(e) => setPassword(e.target.value)}
        type="password" placeholder="*******" />
        <button className="bg-blue-400 text-gray font-bold cursor-pointer px-6 py-2 ">Login</button>

        
          <div className=" text-black text-sm text-left-end- mt-3 "> Forgot your Password!</div>
      
        <Link className="text-sm mt-3 text-right" href={'./register'}>Signup?<span className="underline"></span></Link>

      </form>
    </div>
  </div>;
}