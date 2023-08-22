/* eslint-disable @next/next/no-img-element */
"use client";
import Link from "next/link";
import Image from "next/image";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

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
export default function ServicesRefinancingPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Refinancing | Simpson & Associates</title>
      </Head>
      <SessionProvider>
        <Navbar />
        <div
          id="services"
          className="fade-in flex w-full flex-col items-center justify-center"
        >
          <Header />
          <Refinancing />
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
      Refinancing
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mt-7 lg:w-72"></span>
    <p className="mb-7 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2">
      Refinancing emerges as a strategic financial maneuver that offers property
      owners the opportunity to optimize their existing mortgage terms and
      potentially secure more favorable terms. This process involves replacing
      an existing mortgage with a new one, often with the goal of obtaining a
      lower interest rate, adjusting the loan term, or accessing equity.
    </p>
  </div>
);

const Refinancing = (): JSX.Element => (
  <div className="flex w-full flex-wrap items-center justify-center gap-12 bg-white px-12 pb-12">
    <RefinancingCard
      title="Financial Flexibility"
      description="Are you looking to optimize your mortgage situation and free up funds for other financial needs? Mortgage refinancing could be the solution you've been searching for."
      image="/images/services/couple_blue_banner.png"
      buttonText="Optimize your mortgage"
    />
    <RefinancingCard
      title="Streamlining Finances"
      description="Dealing with multiple loans and debts can be overwhelming, making it challenging to manage your finances effectively. Enter mortgage refinancing as a powerful tool for consolidation."
      image="/images/services/home_blue_banner.png"
      buttonText="Get started"
    />
    <RefinancingCard
      title="Better Rates"
      description="Are you tired of paying high-interest rates on your current mortgage? It's time to seize the opportunity and explore mortgage refinancing to secure more favorable rates. "
      image="/images/services/woodenhome_blue_banner.png"
      buttonText="Improve your rates"
    />
  </div>
);

const RefinancingCard = (props: {
  className?: string;
  buttonText: string;
  title: string;
  description: string;
  image: string;
}): JSX.Element => (
  <Link
    href="#contact"
    className={cn(
      "group relative flex w-[48rem] scale-100 flex-col bg-slate-50 pb-10 text-center duration-500 ease-in-out hover:scale-105 hover:duration-100 lg:h-[25.5rem] lg:w-96",
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
