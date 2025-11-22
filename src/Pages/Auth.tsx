import Login from "@/components/Auth/Login"
import Register from "@/components/Auth/Register"
import { useState, Activity } from "react";





export default function Auth() {


  // login or register status
  const [isLogin, setIsLogin] = useState<boolean>(true);


  return (


    <section className="relative flex min-h-screen w-full bg-black text-white overflow-hidden">


      {/* Right section with visuals */}
      <div className="hidden md:flex flex-col justify-center items-center w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        <img
          src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70"
          alt="social background"
          loading="lazy"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-10 text-center text-gray-200 z-10">
          <p className="text-lg font-medium">Join millions of creators today ✨</p>
        </div>
      </div>


      {/* Main Auth Section */}
      <div className="flex-1 flex items-center justify-center px-4">


        <Activity mode={isLogin ? "visible" : "hidden"} >

          <Login setIsLogin={setIsLogin} />

        </Activity>


        <Activity mode={!isLogin ? "visible" : "hidden"} >

          <Register setIsLogin={setIsLogin} />

        </Activity>


      </div>


    </section>


  )


}
