/* eslint-disable @next/next/no-img-element */
"use client";

// Import react for state and effect
import React from "react";
import { SessionProvider } from "next-auth/react";

// Import components
import Navbar from "@/app/components/navbar/navbar";
import ScrollIndicator from "@/app/components/scrollIndicator";
import Contact from "@/app/components/sections/contact";

// Import tailwind and global styles
import "@/app/styles/globals.css";

/**
 * Agents Page
 * @returns JSX.Element
 */
export default function ServicesCommercialMortgagesPage(): JSX.Element {
  return (
    <SessionProvider>
      <Navbar />
      <div
        id="services"
        className="fade-in flex w-full flex-col items-center justify-center"
      >
        <Header />
        <CommercialMortgages />
      </div>
      <Contact bgColor={"bg-slate-50"} />
      <ScrollIndicator />
    </SessionProvider>
  );
}

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <div className="mt-44 flex flex-col items-center justify-center px-7 pb-6 text-center lg:mt-52">
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Commercial Mortgages
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2">
      Whether you are a first-time buyer or an experienced buyer with excellent
      credit, Simpson & Associates has access to the{" "}
      <strong className="tracking-wide">best products and rates</strong>{" "}
      available across Canada. See below a snapshot of what we have to offer!
    </p>
  </div>
);

const CommercialMortgages = (): JSX.Element => (
  <div className="flex w-full flex-wrap items-center justify-center gap-12 bg-white p-12">
    <CommercialMortgagesCard
      title="Commercial Mortgages Title"
      description="Commercial Mortgages Description about how we can help you with your commercial mortgage."
      image="/images/blue_home_banner.png"
    />
    <CommercialMortgagesCard
      title="Commercial Mortgages Title"
      description="Commercial Mortgages Description about how we can help you with your commercial mortgage."
      image="/images/blue_home_banner.png"
    />
    <CommercialMortgagesCard
      title="Commercial Mortgages Title"
      description="Commercial Mortgages Description about how we can help you with your commercial mortgage."
      image="/images/blue_home_banner.png"
    />
  </div>
);

const CommercialMortgagesCard = (props: {
  title: string;
  description: string;
  image: string;
}): JSX.Element => (
  <div className="group flex w-96 flex-col bg-slate-50 pb-10 text-center duration-500 ease-in-out hover:scale-105">
    <img
      src={props.image}
      alt={props.title}
      className="absolute h-auto w-96 duration-500 ease-in-out group-hover:brightness-110"
    />
    <h1 className="relative z-10 mx-10 mt-[10%] px-10 text-center text-2xl font-bold tracking-wider text-white duration-500 ease-in-out group-hover:scale-110 xs:text-3xl">
      COMMERCIAL MORTGAGES
    </h1>
    <div className="mx-10 mt-16">
      <h3 className="text-2xl font-bold text-primary">{props.title}</h3>
      <p className="mb-5 mt-2 text-sm text-primary">{props.description}</p>
      <a
        href="#contact"
        className="rounded-full bg-secondary px-6 py-2 text-[0.45rem] font-medium tracking-wider text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-[1.05] group-hover:px-8 xs:px-7 xs:py-3 xs:text-xs md:outline-none lg:text-sm lg:group-hover:px-9"
      >
        Get Started
      </a>
    </div>
  </div>
);
