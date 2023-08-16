"use client";

import Image from "next/image";
import Navbar from "@/app/components/navbar/navbar";
import Bottom from "@/app/components/sections/bottom";
import ScrollIndicator from "@/app/components/scrollIndicator";
import Contact from "@/app/components/sections/contact";
import { SessionProvider } from "@/app/components/providers";
import Head from "next/head";

import "@/app/styles/globals.css";

export default function TeamPage(): JSX.Element {
  return (
    <>
      <Head>
        <title>Team | Simpson & Associates</title>
      </Head>
      <SessionProvider>
        <Navbar />
        <div
          id="team"
          className="fade-in flex w-full flex-col items-center justify-center"
        >
          <Header />
        </div>
        <Contact className="bg-slate-50" />
        <ScrollIndicator />
        <Bottom />
      </SessionProvider>
    </>
  );
}
/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <header className="mt-44 flex flex-col items-center justify-center text-center">
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      Meet the team!
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2">
      Whether you are a first-time buyer or an experienced buyer with excellent
      credit, Simpson & Associates has access to the{" "}
      <strong className="tracking-wide">best products and rates</strong>{" "}
      available across Canada. See below a snapshot of what we have to offer!
    </p>
  </header>
);
