"use client";

import React from "react";
import Image from "next/image";

// Render the component
export default function Lenders(): JSX.Element {
  // Get the lenders
  const lenders: any[] = getLenders();

  // Return the component jsx
  return (
    <section
      id="lenders"
      className="group relative flex w-screen flex-col items-center justify-center bg-slate-50 px-10 pb-12 pt-12 sm:pt-16"
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
const LenderImages = (props: { lenders: any }): JSX.Element => {
  const lenderImages = props.lenders.map((lender: any, i: number) => (
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
      <div className="flex animate-marquee-current flex-row whitespace-nowrap">
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
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="w-3/4 text-sm text-primary xs:text-base sm:mb-4 sm:w-1/2">
      We have access to <strong>hundreds</strong> of reputable lending
      institutions to provide you with more options - and the{" "}
      <strong className="tracking-wide">best mortgage products</strong> to suit
      your needs. Below is a snapshot of our lender partners and associations!
    </p>
  </header>
);

/**
 * Get the lenders
 */
const getLenders = (): any[] => [
  {
    logo: "https://dominionlending.ca/wp-content/uploads/2021/05/amba-1.svg",
    href: "https://amba.ca/",
  },
  {
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/b2b-01.svg",
    href: "https://b2bbank.com/",
  },
  {
    logo: "https://dominionlending.ca/wp-content/uploads/2022/03/bridge-water-logo.svg",
    href: "https://bridgewaterbank.ca/",
  },
  {
    logo: "https://dominionlending.ca/wp-content/uploads/2021/05/cmba.svg",
    href: "https://www.cmbabc.ca/",
  },
  {
    logo: "https://dominionlending.ca/wp-content/uploads/2021/05/cmls.svg",
    href: "https://www.cmls.ca/",
  },
  {
    logo: "https://dominionlending.ca/wp-content/uploads/2020/10/dlc-logo.svg",
    href: "https://dominionlending.ca/",
  },
  {
    href: "https://www.equitablebank.ca/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/equitable-01.svg",
  },
  {
    href: "https://fct.ca/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/FCT-01.svg",
  },
  {
    href: "https://www.firstnational.ca/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/First-National-01.svg",
  },
  {
    href: "https://fisgard.com/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/Fisgard-01.svg",
  },
  {
    href: "https://www.homeequitybank.ca/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/Home-Equity-01.svg",
  },
  {
    href: "https://www.hometrust.ca/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/Home-Trust-01.svg",
  },
  {
    href: "https://www.merixfinancial.com/",
    logo: "https://dominionlending.ca/wp-content/uploads/2021/05/lendwise.svg",
  },
  {
    href: "https://www.icicibank.com/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/icici-01.svg",
  },
  {
    href: "https://insureline.com/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/insureline-logo.svg",
  },
  {
    href: "https://www.manulifebank.ca/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/Manulife-01.svg",
  },
  {
    href: "https://www.marathonmortgage.ca/",
    logo: "https://dominionlending.ca/wp-content/uploads/2022/03/marathon-mortgage-logo.svg",
  },
  {
    href: "https://www.mcap.com/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/mcap-logo.svg",
  },
  {
    href: "https://www.wealthonebankofcanada.com/",
    logo: "https://dominionlending.ca/wp-content/uploads/2023/07/wealthone.svg",
  },
  {
    href: "https://www.td.com/ca/en/personal-banking/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/td-logo.svg",
  },
  {
    href: "https://www.scotiabank.com/ca/en/personal.html",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/Scotiabank-logo.svg",
  },
  {
    href: "https://www.rmgmortgages.ca/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/rmg-logo.svg",
  },
  {
    href: "https://www.rfa.ca/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/rfa-logo.svg",
  },
  {
    href: "https://www.reca.ca/",
    logo: "https://dominionlending.ca/wp-content/uploads/2021/05/reca.svg",
  },
  {
    href: "https://mortgageproscan.ca/",
    logo: "https://dominionlending.ca/wp-content/uploads/2020/09/mpc-logo-1.svg",
  },
];
