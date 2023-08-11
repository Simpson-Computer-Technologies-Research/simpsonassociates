"use client";

import React from "react";
import Image from "next/image";

// Render the component
export default function Lenders(): JSX.Element {
  // Manage the lenders state
  const [lenders, setLenders] = React.useState([]);

  // Fetch the lenders from /api/lenders
  React.useEffect(() => {
    fetch("/api/lenders")
      .then((res) => res.json())
      .then((lenders) => setLenders(lenders));
  }, []);

  // Return the component jsx
  return (
    <section
      id="lenders"
      className="group relative flex w-screen flex-col items-center justify-center bg-white px-10 pb-12 pt-12 text-center sm:pb-16 sm:pt-20"
    >
      <Header />
      <LenderImages lenders={lenders} />
    </section>
  );
}

/**
 * Lender Images Component
 * @returns JSX.Element
 */
const LenderImages = (props: { lenders: any }): JSX.Element => (
  <div className="relative mt-4 flex h-auto w-[98%] flex-row overflow-hidden md:w-3/4">
    <div className="flex animate-marquee-current flex-row whitespace-nowrap">
      {props.lenders.map((lender: any, i: number) => (
        <Image
          key={i}
          src={lender.logo}
          alt="..."
          width={200}
          height={200}
          className="mx-4 h-24 w-24 xs:h-32 xs:w-32 sm:h-40 sm:w-40"
        />
      ))}
    </div>
  </div>
);
/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <div className="flex flex-col items-center justify-center">
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Lenders
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="w-3/4 text-sm text-primary xs:text-base sm:mb-4 sm:w-1/2">
      We have access to <strong>hundreds</strong> of reputable lending
      institutions to provide you with more options - and the{" "}
      <strong className="tracking-wide">best mortgage products</strong> to suit
      your needs. Below is a snapshot of our lender partners and associations!
    </p>
  </div>
);
