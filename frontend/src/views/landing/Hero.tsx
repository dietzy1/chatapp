import { BackgroundBeams } from "@/components/ui/background-beams";

import Footer from "./Footer";
import Button from "./Button";
import image from "/app.png";
import Navbar from "./Navbar";
import { ArrowBigLeft } from "lucide-react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Navigate, useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full flex-grow flex-col items-center justify-center bg-neutral-950 antialiased">
      <div className="relative h-[70rem] rounded-md">
        <div className="mx-auto mt-20 max-w-5xl p-4">
          {/* <Navbar /> */}
          <h1 className="relative z-10 bg-gradient-to-b from-orange-200  to-orange-600 bg-clip-text text-center font-sans text-lg  font-bold text-transparent md:text-7xl">
            Exceptional Chats, No Error Handling Required
          </h1>
          <p></p>
          <p className="relative z-10 mx-auto my-2 max-w-xl text-center text-sm text-neutral-400">
            Introducing Chatapp - where a performant Golang/gRPC backend meets a
            spaghetti frontend code for surprisingly delightful and error-free
            conversations!
          </p>

          {/* <Button>hello</Button> */}
          <div className="z-10 mt-10 flex flex-row justify-center gap-20">
            <button
              className="z-10 transform rounded-full bg-orange-500 px-12 py-4 font-bold uppercase tracking-widest text-white transition-colors duration-200 hover:scale-105 hover:bg-[#21e065]"
              onClick={() => {
                navigate("/chat");
              }}
            >
              <div className="flex items-center justify-center">
                GET STARTED
                <ArrowRightIcon className="h-6 w-6 " />
              </div>
            </button>
            <button className="z-10 transform rounded-full border border-neutral-400 bg-black px-12 py-4 font-bold uppercase tracking-widest text-white  transition-colors duration-200 hover:scale-105 hover:bg-[#21e065]">
              <div className="flex items-center justify-center">
                LOG IN
                <ArrowRightIcon className="h-6 w-6" />
              </div>
            </button>
            <Button />
          </div>

          <div className="z-10 mt-10">
            <img
              src={image}
              alt="Application"
              className="rounded-xl opacity-90 shadow-transparent blur-[0.5px]"
            />
          </div>
          {/**/}
        </div>
      </div>
      <Footer />
      <BackgroundBeams />
    </div>
  );
}

export default Hero;

//Welcome to ChatApp, where a performant Golang/gRPC backend dances gracefully with a frontend code that's more spaghetti than your grandma's Sunday dinner. Surprisingly, it works like a charm, serving up exceptional conversations without breaking a single noodle!
