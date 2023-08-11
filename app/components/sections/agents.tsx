"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import CirclesBackground from "../circlesBackground";

/**
 * Agents Component
 * @returns JSX.Element
 */
export default function Agents(): JSX.Element {
  return (
    <section
      id="agents"
      className="group relative flex w-full flex-col items-center justify-center bg-slate-50 p-10 text-center"
    >
      <div className="relative z-[2] rounded-3xl bg-white/20 p-10 my-4 backdrop-blur-3xl">
        <Header />
        <InputAndButtons />
      </div>
      <Image
        src="/images/holding_house_transparent.png"
        // src="/images/house_transparent.png"
        alt="..."
        width={600}
        height={600}
        loading="lazy"
        className="absolute z-0 right-0 top-32"
        // className="mt-1 w-full h-[45%] lg:h-[50%] xl:h-[55%] bottom-0 -z-10 absolute"
      />
      <CirclesBackground />
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
    <p className="mt-6 w-60 text-sm text-primary xs:w-96 lg:text-base px-5 pb-7">
      Our agents are here to help you find the perfect home. Use the search
      filters to find the right agent for you.
    </p>
  </div>
);

/**
 * Input and Buttons
 * @returns JSX.Element
 */
const InputAndButtons = (): JSX.Element => {
  const [input, setInput] = React.useState("");

  return (
    <div className="z-[2] flex flex-col items-center justify-center">
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
