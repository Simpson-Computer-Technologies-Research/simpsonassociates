"use client";

import Image from "next/image";

/**
 * Services Component
 * @returns JSX.Element
 */
export default function Services(): JSX.Element {
  return (
    <section
      id="services"
      className="relative mt-10 flex w-full flex-col items-center justify-center pb-4 sm:mt-20"
    >
      <Header />
      <ServicesCardGrid target="_blank" />
    </section>
  );
}

/**
 * Services Card Grid Component
 */
export const ServicesCardGrid = (props: { target: string }): JSX.Element => (
  <div className="z-[1] grid grid-cols-2 gap-6 pt-4 sm:grid-cols-3 md:p-10 md:pt-4">
    <Card
      href="/services#residential-mortgages"
      target={props.target}
      title="Residential Mortgages"
      para="Getting started with residential mortgages: affordable paths to homeownership."
      icon="/icons/services/house_heart_yellow_fixed.png"
    />
    <Card
      href="/services#commercial-mortgages"
      target={props.target}
      title="Commercial Mortgages"
      para="Embarking on commercial mortgages: propelling business growth strategically."
      icon="/icons/services/skyscraper_yellow_fixed.png"
    />
    <Card
      href="/services#refinancing"
      target={props.target}
      title="Refinancing"
      para="Exploring refinancing: optimizing finances for better prospects."
      icon="/icons/services/house_percent_yellow_fixed.png"
    />
    <Card
      href="/services#access-equity"
      target={props.target}
      title="Access Equity"
      para="Accessing equity: unlocking value for future aspirations. Get access to your hard earn equity."
      icon="/icons/services/house_moneybag_yellow_fixed.png"
    />
    <Card
      href="/services#second-property"
      target={props.target}
      title="Second Property"
      para="Purchasing a second property: expanding horizons with ownership."
      icon="/icons/services/house_normal_yellow_fixed.png"
    />
    <Card
      href="/services#investment-property"
      target={props.target}
      title="Investment Property"
      para="Investment properties: building wealth through strategic real estate."
      icon="/icons/services/house_dollar_yellow_fixed.png"
    />
  </div>
);

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <header className="flex flex-col items-center justify-center text-center">
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
  </header>
);

/**
 * Card Component
 * @param title
 * @param para
 * @param icon
 * @param href
 * @returns Card Component JSX
 */
const Card = (props: {
  title: string;
  para: string;
  icon: string;
  href: string;
  target: string;
}): JSX.Element => (
  <a
    href={props.href}
    rel="noreferrer"
    target={props.target}
    className="ease-in-outhover:duration-100 group relative m-2 flex h-44 w-36 flex-col items-center bg-white/80 p-2 px-3 text-center bg-blend-lighten backdrop-blur-md duration-500 hover:scale-105 hover:bg-slate-50/90 xs:h-52 xs:w-48 xs:p-4 sm:h-60 sm:w-48 sm:p-5 md:m-4 md:h-[15.5rem] md:w-52 lg:h-[18.5rem] lg:w-72 lg:p-7 xl:h-[21.5rem] xl:w-72"
  >
    <Image
      src={props.icon}
      alt="..."
      width={100}
      height={100}
      loading="lazy"
      className="mt-1 w-[50px] lg:w-[100px]"
    />
    <h3 className="mt-1 text-xs font-extrabold tracking-wide text-primary sm:mt-2 sm:text-sm md:text-base xl:text-2xl">
      {props.title}
    </h3>
    <p className="mt-1 text-[0.45rem] text-primary xs:text-[0.6rem] sm:mt-2 lg:text-xs xl:text-sm">
      {props.para}
    </p>
    <button className="absolute bottom-3 rounded-full bg-secondary px-6 py-2 text-[0.45rem] font-medium tracking-wider text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-[1.05] group-hover:px-8 xs:px-7 xs:py-2.5 xs:text-xs sm:bottom-4 md:bottom-5 md:outline-none lg:text-sm lg:group-hover:px-9">
      Learn More
    </button>
  </a>
);
