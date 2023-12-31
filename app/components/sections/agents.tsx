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
      className="relative flex w-full flex-col items-center justify-center bg-white px-10 py-14"
    >
      <div className="z-[2] ml-0 p-10 sm:bg-white/50 sm:backdrop-blur-sm lg:ml-48 2xl:ml-0">
        <Header />
        <InputAndButtons />
      </div>
      <Image
        src="/images/agents/dan_headshot.png"
        alt="..."
        width={600}
        height={600}
        loading="eager"
        className="absolute -left-40 bottom-0 z-[1] h-auto xs:-left-52 sm:-left-60 md:-left-52 lg:-left-32 lg:w-[700px] xl:w-[800px]"
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
  <header className="flex flex-col items-center justify-center text-center">
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">Agents</h2>
    <span className="mx-10 mb-6 mt-6 block h-1 w-3/5 rounded-full bg-secondary xs:w-2/5 sm:mt-8 lg:w-52"></span>
    <p className="w-60 px-5 pb-7 text-sm text-primary xs:w-96 lg:text-base">
      Our agents are here to help you find the perfect home. Use the search
      filters to find the right agent for you.
    </p>
  </header>
);

/**
 * Input and Buttons
 * @returns JSX.Element
 */
const InputAndButtons = (): JSX.Element => {
  const [input, setInput] = React.useState<string>("");

  return (
    <div
      id="agents"
      className="z-[2] flex flex-col items-center justify-center"
    >
      <input
        className="mb-4 w-60 border-b-[2.5px] border-primary p-2 text-xs text-gray-800 focus:outline-none xs:w-96 xs:text-sm xs:focus:border-transparent xs:focus:ring-[2.5px] xs:focus:ring-primary sm:text-base"
        type="text"
        placeholder="Enter an agent name, city, or language"
        onChange={(e) => setInput(e.target.value)}
      />
      <Link
        href={`/agents?query=${input}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 w-60 bg-primary p-2 text-center text-sm text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96 sm:text-base"
      >
        Search
      </Link>
      <Link
        href="/agents"
        target="_blank"
        rel="noopener noreferrer"
        className="w-60 bg-primary p-2 text-center text-sm text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96 sm:text-base"
      >
        See all agents
      </Link>
    </div>
  );
};
