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
import { cn } from "@/app/lib/utils";

/**
 * Agents Page
 * @returns JSX.Element
 */
export default function ServicesRefinancingPage(): JSX.Element {
  return (
    <SessionProvider>
      <Navbar />
      <div
        id="services"
        className="fade-in flex w-full flex-col items-center justify-center"
      >
        <Header />
        <Refinancing />
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
    <h2 className="text-5xl font-extrabold text-primary xs:text-6xl lg:text-7xl">
      Refinancing
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

const Refinancing = (): JSX.Element => (
  <div className="flex w-full flex-wrap items-center justify-center gap-12 bg-white p-12">
    <RefinancingCard
      title="Mortgage Refinancing"
      description="Refinancing your mortgage can be a great way to save money by consolidating your high-interest debt, lowering your monthly payments, or accessing your home’s equity."
      image="/images/services/refinancing/mortgage-refinancing.jpg"
    />
    <RefinancingCard
      title="Home Equity Line of Credit"
      description="A home equity line of credit (HELOC) is a revolving line of credit secured against your home. It allows you to access up to 65% of the value of your home."
      image="/images/services/refinancing/home-equity-line-of-credit.jpg"
    />
    <RefinancingCard
      title="Home Equity Loan"
      description="A home equity loan is a loan secured against the equity in your home. It allows you to access up to 80% of the value of your home."
      image="/images/services/refinancing/home-equity-loan.jpg"
    />
  </div>
);

const RefinancingCard = (props: {
  className?: string;
  title: string;
  description: string;
  image: string;
}): JSX.Element => (
  <div
    className={cn(
      "group flex w-[48rem] scale-100 flex-col bg-slate-50 pb-10 text-center duration-500 ease-in-out hover:scale-105 lg:w-96",
      props.className,
    )}
  >
    <img
      src={props.image}
      alt={props.title}
      className="absolute h-36 w-full group-hover:brightness-110 xs:h-48 sm:h-52 md:h-60 lg:h-auto"
    />
    <div className="mx-10 mt-40 xs:mt-52 sm:mt-60 md:mt-64 lg:mt-44">
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
