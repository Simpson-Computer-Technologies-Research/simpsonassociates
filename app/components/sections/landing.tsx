"use client";

import Image from "next/image";
import { schema } from "../../../schema.module.js";

/**
 * Landing Component
 * @returns JSX.Element
 */
export default function Landing(): JSX.Element {
  return (
    <section
      className="relative flex h-[750px] flex-row xs:h-[710px] sm:h-[820px] lg:h-[900px]"
      id="home"
    >
      {/* Background */}
      <span className="btm_clip-poly absolute z-[1] h-full w-screen bg-secondary" />
      <span className="bg-stripes-landing btm_clip-poly absolute z-[1] h-[98.7%] w-screen bg-primary" />

      {/* Content */}
      <div className="z-[3] m-9 mr-10 mt-[10rem] flex flex-row justify-between sm:m-14 sm:mt-44 lg:m-24 lg:mt-56 xl:mr-20">
        <div className="fade-in flex flex-col">
          <Header />
          <GetStartedButton />
        </div>
      </div>

      {/* Right Side Image */}
      <Image
        priority={true}
        key={Math.random()}
        width={800}
        height={800}
        src={schema.image}
        loading="eager"
        className="absolute left-[50%] top-[65%] z-[2] h-72 w-72 rounded-full shadow-xl xs:left-[54%] xs:top-[54%] sm:left-[52%] sm:top-[45%] sm:h-96 sm:w-96 md:left-[50%] lg:relative lg:left-0 lg:top-1/4 lg:mr-32 lg:mt-12 lg:h-[60%] lg:w-[60%] lg:blur-none xl:mr-24 xl:mt-7 xl:h-[35rem] xl:w-[35rem]"
        alt="..."
      />
    </section>
  );
}

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <header className="w-auto sm:w-[95%] lg:w-auto">
    <h1 className="text-5xl font-extrabold tracking-wide text-white md:text-6xl xl:text-7xl">
      Navigating{" "}
      <mark className="bg-transparent leading-tight text-secondary">
        Mortgages
      </mark>
      , Simplifying Your Future
      <mark className="bg-transparent leading-tight text-secondary">.</mark>
    </h1>
    <p className="mt-4 w-[65%] text-base font-medium tracking-wider text-para md:w-[55%] lg:w-full lg:text-lg xl:w-3/4">
      <strong>Low rates</strong>, <strong>expert advice</strong>, and{" "}
      <strong>no hidden fees</strong>; we&rsquo;re here to help you navigate the
      mortgage process.
    </p>
  </header>
);

/**
 * Get Started Button Component
 * @returns JSX.Element
 */
const GetStartedButton = (): JSX.Element => {
  /**
   * Arrow SVG Component
   * @returns JSX.Element
   */
  const ArrowSvg = (): JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="27"
      height="27"
      fill="currentColor"
      className="bi bi-arrow-right-circle-fill text-primary group-hover:animate-pulse"
      viewBox="0 0 16 16"
    >
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
    </svg>
  );

  // Return the main component
  return (
    <a
      href="#agents"
      className="group mt-8 w-60 rounded-full bg-white px-8 py-5 shadow-lg duration-500 ease-in-out hover:w-64"
    >
      <div className="flex flex-row items-start justify-between">
        <h2 className="ml-2 text-lg font-bold tracking-wide text-primary">
          Get Started
        </h2>
        <ArrowSvg />
      </div>
    </a>
  );
};
