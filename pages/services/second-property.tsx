/* eslint-disable @next/next/no-img-element */
"use client";

// Import react for state and effect
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
import { cn } from "@/lib/utils";

/**
 * Agents Page
 * @returns JSX.Element
 */
export default function ServicesSecondPropertyPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Second Property | Simpson & Associates</title>
      </Head>
      <SessionProvider>
        <Navbar />
        <div
          id="services"
          className="fade-in flex w-full flex-col items-center justify-center"
        >
          <Header />
          <SecondProperty />
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
      Second Property
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mt-7 lg:w-72"></span>
    <p className="mb-6 w-3/4 text-sm text-primary xs:text-base sm:text-lg">
      Second properties, often referred to as vacation homes or secondary
      residences, offer individuals the chance to create personal getaways,
      investment opportunities, or a combination of both. Acquiring a second
      property involves securing a mortgage that is distinct from a primary
      residence loan, as it takes into account different usage patterns and
      financial considerations.
    </p>
  </div>
);

const SecondProperty = (): JSX.Element => (
  <div className="flex w-full flex-wrap items-center justify-center gap-12 bg-white px-12 pb-12">
    <SecondPropertyCard
      title="Vacation Home & Second Property"
      description="Acquiring a vacation home or second property ought to be smooth and hassle-free – that's where we step in! We'll expertly guide you through each phase, guaranteeing the finest mortgage for your new home away from home."
      image="/images/services/vacation_blue_banner.png"
      buttonText="Purchase a property"
    />
    <SecondPropertyCard
      title="Non-resident Lending"
      description="Eager to join Canada's real estate scene but hindered by non-citizenship? Count on us! We'll guide you through the additional measures needed for a Canadian home purchase, decoding the intricate documentation demands."
      image="/images/services/movein_blue_banner.png"
      buttonText="Get started"
    />
  </div>
);

const SecondPropertyCard = (props: {
  className?: string;
  buttonText: string;
  title: string;
  description: string;
  image: string;
}): JSX.Element => (
  <Link
    href="#contact"
    className={cn(
      "group relative flex w-[48rem] scale-100 flex-col bg-slate-50 pb-10 text-center duration-500 ease-in-out hover:scale-105 hover:duration-100 lg:h-[28rem] lg:w-[28rem]",
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
    <div className="mx-10 mt-40 flex flex-col items-center justify-center xs:mt-52 sm:mt-60 md:mt-64 lg:mt-48">
      <h3 className="text-2xl font-bold text-primary">{props.title}</h3>
      <p className="mb-9 mt-2 text-sm text-primary">{props.description}</p>
      <button className="rounded-full bg-secondary px-10 py-3.5 text-center text-xs font-medium tracking-wider text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-[1.05] group-hover:px-12 xs:px-10 xs:py-4 xs:text-sm sm:text-base md:outline-none lg:absolute lg:bottom-4 lg:text-sm">
        {props.buttonText}
      </button>
    </div>
  </Link>
);
