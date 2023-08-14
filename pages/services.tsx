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
export default function Services(): JSX.Element {
  // Render the agents page
  return (
    <SessionProvider>
      <Navbar />
      <div
        id="services"
        className="fade-in relative flex w-full flex-col px-12 pb-16 pt-20"
      >
        <Header />
        <ServicesGrid />
      </div>
      <Contact bgColor={"bg-slate-50"}/>
      <ScrollIndicator />
    </SessionProvider>
  );
}

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <div className="mt-36 flex flex-col items-center justify-center text-center">
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Services
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2">
      Whether you are a first-time buyer or an experienced buyer with excellent
      credit, Simpson and Associates has access to the{" "}
      <strong className="tracking-wide">best products and rates</strong>{" "}
      available across Canada.
    </p>
  </div>
);

const ServicesGrid = (): JSX.Element => (
  <div className="mt-10 grid grid-cols-2 place-items-center gap-4">
    <ServiceCard />
    <ServiceCard />
    <ServiceCard />
    <ServiceCard />
  </div>
);

const ServiceCard = (): JSX.Element => (
  <div className="h-[500px] w-[500px] bg-slate-50 text-center">
    <h2 className="mt-12 text-6xl font-extrabold text-primary">Service</h2>
  </div>
);
