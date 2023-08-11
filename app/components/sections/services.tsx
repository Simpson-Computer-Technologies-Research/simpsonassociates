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
      className="relative mt-10 flex w-full flex-col items-center justify-center pb-4 text-center sm:mt-20"
    >
      <Header />
      <Image
        src="/images/house_transparent_bg.png"
        alt="..."
        width={1920}
        height={1080}
        loading="lazy"
        className="mt-1 w-full h-[45%] lg:h-[50%] xl:h-[55%] bottom-0 -z-10 absolute"
      />

      {/* Grid of info cards */}
      <div className="z-[1] mt-4 grid grid-cols-2 gap-6 md:m-10 md:mt-4 lg:grid-cols-3">
        <Card
          href="/services#residential-mortgages"
          title="Residential Mortgages"
          para="Getting started with residential mortgages: affordable paths to homeownership."
          icon="/icons/services/house_heart_yellow_fixed.png"
        />
        <Card
          href="/services#commercial-mortgages"
          title="Commercial Mortgages"
          para="Embarking on commercial mortgages: propelling business growth strategically."
          icon="/icons/services/skyscraper_yellow_fixed.png"
        />
        <Card
          href="/services#refinancing"
          title="Refinancing"
          para="Exploring refinancing: optimizing finances for better prospects."
          icon="/icons/services/house_percent_yellow_fixed.png"
        />
        <Card
          href="/services#access-equity"
          title="Access Equity"
          para="Accessing equity: unlocking value for future aspirations. Get access to your hard earn equity."
          icon="/icons/services/house_moneybag_yellow_fixed.png"
        />
        <Card
          href="/services#second-property"
          title="Second Property"
          para="Purchasing a second property: expanding horizons with ownership."
          icon="/icons/services/house_normal_yellow_fixed.png"
        />
        <Card
          href="/services#investment-property"
          title="Investment Property"
          para="Investment properties: building wealth through strategic real estate."
          icon="/icons/services/house_dollar_yellow_fixed.png"
        />
      </div>
    </section>
  );
}

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <div className="flex flex-col items-center justify-center">
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Services
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2">
      Whether you are a first-time buyer or an experienced buyer with excellent
      credit, Simpson and Associates has access to the{" "}
      <strong className="tracking-wide">best products and rates</strong>{" "}
      available across Canada.
    </p>
  </div>
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
}): JSX.Element => (
  <a
    href={props.href}
    rel="noreferrer"
    target="_blank"
    className="group relative flex hover:shadow-2xl shadow-slate-200/10 h-48 w-36 flex-col backdrop-blur-md items-center bg-blend-lighten hover:scale-105 rounded-2xl bg-white/70 p-2 px-4 duration-500 ease-in-outhover:duration-100 xs:h-[12.5rem] xs:w-52 xs:p-4 sm:m-4 sm:h-56 sm:w-60 sm:p-5 md:h-64 lg:h-80 lg:w-64 lg:p-7 xl:h-[21rem] xl:w-72"
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
    <button className="absolute bottom-3 rounded-full bg-tertiary px-6 py-2 text-[0.45rem] font-medium tracking-wider text-white outline-2 outline-tertiary duration-500 ease-in-out hover:animate-pulse group-hover:px-10 hover:brightness-[1.05] xs:px-8 xs:py-3 xs:text-xs sm:bottom-4 sm:text-sm md:bottom-5 md:outline-none">
      Learn More
    </button>
  </a>
);