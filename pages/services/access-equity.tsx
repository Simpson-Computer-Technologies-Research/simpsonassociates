/* eslint-disable @next/next/no-img-element */
"use client";

// Import react for state and effect
import React from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { SessionProvider } from "next-auth/react";

// Import components
import Navbar from "@/app/components/navbar/navbar";
import ScrollIndicator from "@/app/components/scrollIndicator";
import Contact from "@/app/components/sections/contact";
import Bottom from "@/app/components/sections/bottom";

// Import tailwind and global styles
import "@/app/styles/globals.css";
import { cn } from "@/app/lib/utils";

/**
 * Agents Page
 * @returns JSX.Element
 */
export default function ServicesAccessEquityPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Access Equity | Simpson & Associates</title>
      </Head>
      <SessionProvider>
        <Navbar />
        <div
          id="services"
          className="fade-in flex w-full flex-col items-center justify-center"
        >
          <Header />
          <AccessEquity />
        </div>
        <Contact className="bg-slate-50" />
        <ScrollIndicator />
        <Bottom />
      </SessionProvider>
    </>
  );
}

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <div className="mt-44 flex flex-col items-center justify-center px-7 pb-6 text-center lg:mt-52">
    <h2 className="text-5xl font-extrabold text-primary xs:text-6xl lg:text-7xl">
      Access Equity
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2">
      Whether you are a first-time buyer or an experienced buyer with excellent
      credit, Simpson & Associates has access to the{" "}
      <strong className="tracking-wide">best products and rates</strong>{" "}
      available across Canada. See below a snapshot of what we have to offer!
    </p>
  </div>
);

const AccessEquity = (): JSX.Element => (
  <div className="flex w-full flex-wrap items-center justify-center gap-12 bg-white px-12 pb-12">
    <AccessEquityCard
      title="Second Mortgage"
      description="Unlock the equity you've accrued in your home and redirect funds with a second mortgage. It's also a smart move for consolidating debt. Allow us to assess if a second mortgage suits your needs!"
      image="/images/blue_home_banner.png"
    />
    <AccessEquityCard
      title="HELOC"
      description="Like a second mortgage, a Home Equity Line of Credit (HELOC) grants access to your home's accrued equity. Unlike a lump sum from a second mortgage, a HELOC offers a flexible line of credit for spending and repaying as required."
      image="/images/blue_home_banner.png"
    />
    <AccessEquityCard
      title="Reverse Mortgage"
      description="Seeking added funds during retirement? Reverse mortgages provide viable options for those aged 55 and above, especially if property holds substantial net worth. Access your hard-earned home equity and unlock the years of effort you've invested."
      image="/images/blue_home_banner.png"
    />
  </div>
);

const AccessEquityCard = (props: {
  className?: string;
  title: string;
  description: string;
  image: string;
}): JSX.Element => (
  <Link
    href="#contact"
    className={cn(
      "group flex w-[48rem] scale-100 flex-col bg-slate-50 pb-10 text-center duration-500 ease-in-out hover:scale-105 lg:h-[27rem] lg:w-96",
      props.className,
    )}
  >
    <Image
      src={props.image}
      alt={props.title}
      className="absolute h-36 w-full group-hover:brightness-110 xs:h-48 sm:h-52 md:h-60 lg:h-auto"
    />
    <div className="mx-10 mt-40 flex flex-col items-center justify-center xs:mt-52 sm:mt-60 md:mt-64 lg:mt-44">
      <h3 className="text-2xl font-bold text-primary">{props.title}</h3>
      <p className="mb-9 mt-2 text-sm text-primary">{props.description}</p>
      <button className="rounded-full bg-secondary px-10 py-3.5 text-center text-xs font-medium tracking-wider text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-[1.05] group-hover:px-12 xs:px-10 xs:py-4 xs:text-sm sm:text-base md:outline-none lg:absolute lg:bottom-4 lg:text-sm">
        Get Started
      </button>
    </div>
  </Link>
);
