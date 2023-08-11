"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";

/**
 * Agents Component
 * @returns JSX.Element
 */
export default function Agents(): JSX.Element {
  return (
    <section
      id="agents"
      className="group relative flex w-full flex-col items-center justify-center bg-slate-50 p-10 pt-20 text-center"
    >
      <div className="relative z-[2] mb-10 rounded-3xl bg-white/20 p-10 backdrop-blur-3xl md:mr-[45%] lg:mr-[55%]">
        <Header />
        <SearchFilters />
      </div>
      <Image
        src="/images/holding_house_yellow_3.png"
        alt="..."
        width={1920}
        height={1080}
        className="absolute bottom-0 max-h-full h-full w-screen lg:right-0 -right-16 md:-right-10 min-w-[95rem] lg:min-w-[110rem]"
      />
    </section>
  );
}

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <div className="z-[2] flex flex-col items-center justify-center">
    <h2 className="text-5xl font-extrabold text-primary md:text-6xl lg:text-7xl">
      Agents
    </h2>
    <p className="mt-6 mb-4 w-60 text-sm text-primary xs:w-96 lg:text-base">
      Our agents are here to help you find the perfect home. Use the search
      filters to find the right agent for you.
    </p>
  </div>
);

/**
 * Search Filters Component. Can use Postal COde, City, or Agent Name
 * @returns JSX.Element
 */
const SearchFilters = (): JSX.Element => {
  const [input, setInput] = React.useState("");

  return (
    <div className="z-[2] mt-4 flex flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center space-x-4">
        <div className="text-start">
          <input
            className="mb-4 w-60 rounded-md border-2 border-gray-300 p-2 text-xs text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-secondary xs:w-96 sm:text-base"
            type="text"
            placeholder="Enter an agent name, city, or language"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Link
          href={`/agents?query=${input}`}
          className="mb-4 w-60 rounded-md bg-tertiary p-2 text-sm text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96 sm:text-base"
        >
          Search
        </Link>
        <Link
          href="/agents"
          className="mb-4 w-60 rounded-md bg-tertiary p-2 text-sm text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96 sm:text-base"
        >
          See all agents
        </Link>
      </div>
    </div>
  );
};
