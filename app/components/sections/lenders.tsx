"use client";

import Image from "next/image";
import { LENDERS } from "@/lib/constants";
import { Lender } from "@/lib/types";

// Render the component
export default function Lenders(): JSX.Element {
  return (
    <section
      id="lenders"
      className="group relative flex w-screen flex-col items-center justify-center bg-slate-50 px-10 pb-12 pt-14"
    >
      <Header />
      <LenderImages />
    </section>
  );
}

/**
 * Lender Images Component
 * @returns JSX.Element
 */
const LenderImages = () => {
  const lenderImages = LENDERS.map((lender: Lender, i: number) => (
    <Image
      key={i}
      src={lender.logo}
      alt="..."
      width={200}
      height={200}
      className="mx-4 h-24 w-24 xs:h-32 xs:w-32 sm:h-40 sm:w-40"
    />
  ));
  return (
    <div className="relative mt-4 flex h-auto w-[98%] flex-row overflow-hidden md:w-3/4">
      <div className="relative flex animate-marquee-current flex-row">
        {lenderImages}
      </div>
    </div>
  );
};
/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <header className="flex flex-col items-center justify-center text-center">
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Lenders
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mt-7 lg:w-72"></span>
    <p className="w-3/4 text-sm text-primary xs:text-base sm:mb-4 sm:w-1/2">
      We have access to <strong>hundreds</strong> of reputable lending
      institutions to provide you with more options - and the{" "}
      <strong className="tracking-wide">best mortgage products</strong> to suit
      your needs. Below is a snapshot of our lender partners and associations!
    </p>
  </header>
);
