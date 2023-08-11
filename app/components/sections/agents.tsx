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
      className="relative flex w-full flex-col items-center justify-center bg-slate-50 p-10 text-center"
    >
      <div className="relative z-[2] rounded-3xl bg-white/20 p-10 my-4 backdrop-blur-3xl">
        <Header />
        <InputAndButtons />
      </div>
      <Image
        src="/images/holding_house_transparent.png"
        alt="..."
        width={600}
        height={600}
        loading="lazy"
        className="absolute z-[1] right-0 top-32 hidden md:block"
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
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">Agents</h2>
    <span className="mx-10 mb-6 mt-6 sm:mt-8 block h-1 w-3/5 rounded-full bg-secondary xs:w-2/5 sm:mb-10 lg:w-52"></span>
    <p className="w-60 text-sm text-primary xs:w-96 lg:text-base px-5 pb-7">
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
            className="mb-4 w-60 rounded-lg border-2 border-gray-200 p-2 text-xs xs:text-sm text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary xs:w-96 sm:text-base"
            type="text"
            placeholder="Enter an agent name, city, or language"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Link
          href={`/agents?query=${input}`}
          className="mb-4 w-60 rounded-lg bg-tertiary p-2 text-sm text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96 sm:text-base"
        >
          Search
        </Link>
        <Link
          href="/agents"
          className="mb-4 w-60 rounded-lg bg-tertiary p-2 text-sm text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96 sm:text-base"
        >
          See all agents
        </Link>
      </div>
    </div>
  );
};
