/* eslint-disable @next/next/no-img-element */
"use client";
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
import { cn } from "@/lib/utils";

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
    <p className="mb-6 w-3/4 text-sm text-primary xs:text-base sm:text-lg">
      Accessing equity from real estate holdings represents a strategic maneuver
      that empowers property owners to unlock the inherent value of their
      assets. Whether through home equity loans or lines of credit, this process
      allows homeowners to tap into the accumulated worth of their properties
      for various financial endeavors. By leveraging the equity they've built
      over time, individuals can fund home improvements, educational expenses,
      debt consolidation, or other significant life events.
    </p>
  </div>
);

const AccessEquity = (): JSX.Element => (
  <div className="flex w-full flex-wrap items-center justify-center gap-12 bg-white px-12 pb-12">
    <AccessEquityCard
      title="Second Mortgage"
      description="Unlock the equity you've accrued in your home and redirect funds with a second mortgage. It's also a smart move for consolidating debt. Allow us to assess if a second mortgage suits your needs!"
      image="/images/services/home_blue_banner.png"
      buttonText="Unlock equity"
    />
    <AccessEquityCard
      title="HELOC"
      description="Like a second mortgage, a Home Equity Line of Credit (HELOC) grants access to your home's accrued equity. Unlike a lump sum from a second mortgage, a HELOC offers a flexible line of credit for spending and repaying as required."
      image="/images/services/woodenhome_blue_banner.png"
      buttonText="Get started"
    />
    <AccessEquityCard
      title="Reverse Mortgage"
      description="Seeking added funds during retirement? Reverse mortgages provide viable options for those aged 55 and above, especially if property holds substantial net worth. Access your hard-earned home equity and unlock the years of effort you've invested."
      image="/images/services/handshake_blue_banner.png"
      buttonText="Contact us"
    />
  </div>
);

const AccessEquityCard = (props: {
  className?: string;
  buttonText: string;
  title: string;
  description: string;
  image: string;
}): JSX.Element => (
  <Link
    href="#contact"
    className={cn(
      "group flex w-[48rem] scale-100 flex-col bg-slate-50 pb-10 text-center duration-500 ease-in-out hover:scale-105 hover:duration-100 lg:h-[27rem] lg:w-96",
      props.className,
    )}
  >
    <Image
      width={500}
      height={500}
      src={props.image}
      alt={props.title}
      className="absolute h-36 w-full group-hover:brightness-110 xs:h-48 sm:h-52 md:h-60 lg:h-auto"
    />
    <div className="mx-10 mt-40 flex flex-col items-center justify-center xs:mt-52 sm:mt-60 md:mt-64 lg:mt-44">
      <h3 className="text-2xl font-bold text-primary">{props.title}</h3>
      <p className="mb-9 mt-2 text-sm text-primary">{props.description}</p>
      <button className="rounded-full bg-secondary px-10 py-3.5 text-center text-xs font-medium tracking-wider text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-[1.05] group-hover:px-12 xs:px-10 xs:py-4 xs:text-sm sm:text-base md:outline-none lg:absolute lg:bottom-4 lg:text-sm">
        {props.buttonText}
      </button>
    </div>
  </Link>
);
