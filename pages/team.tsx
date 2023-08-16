"use client";

import Image from "next/image";
import Navbar from "@/app/components/navbar/navbar";
import Bottom from "@/app/components/sections/bottom";
import ScrollIndicator from "@/app/components/scrollIndicator";
import Contact from "@/app/components/sections/contact";
import { SessionProvider } from "@/app/components/providers";
import Head from "next/head";
import React from "react";

import "@/app/styles/globals.css";
import { SetState } from "@/app/lib/types";

export default function TeamPage(): JSX.Element {
  const [emailTo, setEmailTo] = React.useState("");

  return (
    <>
      <Head>
        <title>Team | Simpson & Associates</title>
      </Head>
      <SessionProvider>
        <Navbar />
        <div
          id="team"
          className="fade-in flex w-full flex-col items-center justify-center pb-32"
        >
          <ExecutiveTeam setEmailTo={setEmailTo} />
        </div>
        <Contact className="bg-slate-50" emailTo={emailTo} />
        <ScrollIndicator />
        <Bottom />
      </SessionProvider>
    </>
  );
}

/**
 * The Executive Team
 * @returns JSX.Element
 */
const ExecutiveTeam = (props: {
  setEmailTo: SetState<string>;
}): JSX.Element => (
  <section className="mt-52 flex flex-col items-center justify-center text-center">
    <h3 className="text-4xl font-extrabold text-primary lg:text-5xl">
      Executive Team
    </h3>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2">
      Whether you are a first-time buyer or an experienced buyer with excellent
      credit, Simpson & Associates has access to the{" "}
      <strong className="tracking-wide">best products and rates</strong>{" "}
      available across Canada. See below a snapshot of what we have to offer!
    </p>
    <div className="flex flex-wrap items-center justify-center gap-6 px-2 sm:gap-12 md:gap-16 xl:gap-20">
      <AgentCard />
      <AgentCard />
      <AgentCard />
    </div>
  </section>
);

/**
 * Agent Card
 * @returns JSX.Element
 */
const AgentCard = (): JSX.Element => (
  <div className="mt-7 flex flex-col items-center justify-center duration-500 ease-in-out hover:scale-105 lg:flex-row">
    <div className="flex flex-col items-center justify-center">
      <Image
        src="/images/team/dansimpson.png"
        alt="Dan Simpson"
        width={300}
        height={300}
        className="rounded-full border-4 border-primary"
      />
      <h4 className="mb-1 mt-2 text-4xl font-bold tracking-wide text-primary">
        Dan Simpson
      </h4>
      <p className="mb-4 text-lg text-primary">Founder</p>
      <a
        href="#contact"
        className="rounded-full bg-secondary px-16 py-4 text-lg text-white duration-500 ease-in-out hover:animate-pulse hover:px-20"
      >
        Contact
      </a>
    </div>
  </div>
);
