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
export default function ServicesCommercialMortgagesPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Commercial Mortgages | Simpson & Associates</title>
      </Head>
      <SessionProvider>
        <Navbar />
        <div
          id="services"
          className="fade-in flex w-full flex-col items-center justify-center"
        >
          <Header />
          <CommercialMortgages />
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
      Commercial Mortgages
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mt-7 lg:w-72"></span>
    <p className="mb-7 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2">
      A commercial mortgage serves as a financial lifeline for businesses
      seeking to acquire, expand, or refinance properties to support their
      growth. This specialized form of lending provides the necessary capital to
      purchase real estate assets like office buildings, retail spaces, or
      industrial complexes. Unlike residential mortgages, commercial mortgages
      are tailored to the unique needs of businesses, offering flexible terms,
      competitive interest rates, and repayment schedules that align with the
      ebbs and flows of the business world.
    </p>
  </div>
);

const CommercialMortgages = (): JSX.Element => (
  <div className="flex w-full flex-wrap items-center justify-center gap-12 bg-white px-12 pb-12">
    <CommercialMortgagesCard
      title="Unlock Business Potential"
      description="Are you ready to take your business to the next level? A commercial mortgage might be the key you need to unlock new opportunities. Expand your business, invest in new equipment, or purchase a new property."
      image="/images/services/home_blue_banner.png"
      buttonText="Unlock potential"
    />
    <CommercialMortgagesCard
      title="Investment"
      description="Dive into the world of real estate investment and turn your property dreams into reality with a commercial mortgage. Whether you're a seasoned investor or just starting out, commercial mortgages provide the means to acquire income-generating properties."
      image="/images/services/forsale_blue_banner.png"
      buttonText="Start investing"
    />
    <CommercialMortgagesCard
      title="Business Expansion"
      description="Is your business outgrowing its current space? Don't let limited real estate hold you back. Empower your business expansion by harnessing the potential of commercial mortgages. Our options provide the means to secure the perfect space for your needs."
      image="/images/services/skyscraper_blue_banner.png"
      buttonText="Expand your business"
    />
  </div>
);

const CommercialMortgagesCard = (props: {
  className?: string;
  buttonText: string;
  title: string;
  description: string;
  image: string;
}): JSX.Element => (
  <Link
    href="#contact"
    className={cn(
      "group relative flex h-[28.5rem] w-[48rem] scale-100 flex-col bg-slate-50 pb-10 text-center duration-500 ease-in-out hover:scale-105 hover:duration-100 lg:w-96",
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
