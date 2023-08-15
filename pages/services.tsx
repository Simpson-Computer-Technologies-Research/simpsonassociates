/* eslint-disable @next/next/no-img-element */
"use client";

// Import react for state and effect
import React from "react";
import { SessionProvider } from "next-auth/react";

// Import components
import Navbar from "@/app/components/navbar/navbar";
import ScrollIndicator from "@/app/components/scrollIndicator";
import Contact from "@/app/components/sections/contact";
import { ServicesCardGrid } from "@/app/components/sections/services";

// Import tailwind and global styles
import "@/app/styles/globals.css";

/**
 * Agents Page
 * @returns JSX.Element
 */
export default function ServicesPage(): JSX.Element {
  // Render the agents page
  return (
    <SessionProvider>
      <Navbar />
      <div
        id="services"
        className="fade-in relative flex w-full flex-col items-center justify-center"
      >
        <Header />
        <ServicesCardGrid target="" />
        <ResidentialMortgages />
        <CommercialMortgages />
        <Refinancing />
        <AccessEquity />
        <SecondProperty />
        <InvestmentProperty />
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
  <div className="mt-44 lg:mt-52 flex flex-col items-center justify-center px-7 pb-6 text-center">
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Services
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

const ResidentialMortgages = (): JSX.Element => (
  <div
    id="residential-mortgages"
    className="mt-10 md:mt-2 flex w-full flex-col items-center justify-center bg-slate-50 p-20 px-7 text-center"
  >
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Residential Mortgages
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2"></p>
  </div>
);

const CommercialMortgages = (): JSX.Element => (
  <div
    id="commercial-mortgages"
    className="flex w-full flex-col items-center justify-center p-20 px-7 text-center"
  >
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Commercial Mortgages
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2"></p>
  </div>
);

const Refinancing = (): JSX.Element => (
  <div
    id="refinancing"
    className="flex w-full flex-col items-center justify-center bg-slate-50 p-20 px-7 text-center"
  >
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Refinancing
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2"></p>
  </div>
);

const AccessEquity = (): JSX.Element => (
  <div
    id="access-equity"
    className="flex w-full flex-col items-center justify-center p-20 px-7 text-center"
  >
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Access Equity
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2"></p>
  </div>
);

const SecondProperty = (): JSX.Element => (
  <div
    id="second-property"
    className="flex w-full flex-col items-center justify-center bg-slate-50 p-20 px-7 text-center"
  >
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Second Property
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2"></p>
  </div>
);

const InvestmentProperty = (): JSX.Element => (
  <div
    id="investment-property"
    className="flex w-full flex-col items-center justify-center p-20 px-7 text-center"
  >
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Investment Property
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2"></p>
  </div>
);
