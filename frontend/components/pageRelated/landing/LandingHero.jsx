"use client";
import React from "react";
import Link from "next/link";

const LandingHero = () => {
  return (
    <div
      className="h-screen relative 
      overflow-hidden bg-slate-950"
    >
      <div
        className="vignette__landing__page absolute
        w-full h-full top-0 left-0 pointer-events-none"
      ></div>
      <video
        src="/farmer.mp4"
        type="video/mp4"
        autoPlay
        loop
        muted
        className="bg__video__landing__page pointer-events-none
        w-screen min-h-full absolute top-0 left-0 object-center object-cover"
        data-speed="0.8"
      ></video>
      <div
        className="center__item__landing__page pointer-events-none absolute
        text-center flex main__text__landing__page items-center justify-center flex-col"
      >
        <h1
          data-speed="0.7"
          className="stroked drop-shadow-md mb-3 text-8xl uppercase font-bold"
        >
          Farm Flow
        </h1>
        <h2
          data-speed="0.69"
          className="stroked mb-10 drop-shadow-md text-7xl font-thin"
        >
          Where agriculture thrives
        </h2>
        <div
          data-speed="0.68"
          className="buttons__landing__page cursor-pointer"
        >
          <Link href="/marketplace">
            <button className="text-2xl w-72 rounded-3xl cursor-pointer">
              Explore
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingHero;
