import { BackgroundBeams } from "@/components/ui/background-beams";
import "./loading.css";
import React from "react";
import Footer from "../landing/Footer";
import Commits from "./Commits";

function Loading() {
  return (
    <>
      <div className="flex h-screen w-full flex-grow flex-col items-center justify-center bg-neutral-950 antialiased">
        <div className="text mb-10  font-sans  text-3xl font-bold">
          Does authentication work today?
        </div>

        <div className="font-sans font-semibold">
          fetching latests commits...
        </div>
        <Commits />

        <span className="loader"></span>
      </div>

      <BackgroundBeams />
      <Footer />
    </>
  );
}

export default Loading;
