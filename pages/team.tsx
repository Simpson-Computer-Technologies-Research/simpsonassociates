"use client";

import Link from "next/link";
import Image from "next/image";
import Navbar from "@/app/components/navbar/navbar";
import Bottom from "@/app/components/sections/bottom";
import ScrollIndicator from "@/app/components/scrollIndicator";
import Contact from "@/app/components/sections/contact";
import { SessionProvider } from "@/app/components/providers";
import Head from "next/head";
import { cn } from "@/lib/utils";

import "@/app/styles/globals.css";
import { Agent } from "@/lib/types";
import { ObjectState } from "@/lib/state";
import { SUPPORT_TEAM, LEADERSHIP_TEAM } from "@/lib/constants";

export default function TeamPage(): JSX.Element {
  const emailTo = new ObjectState<string>("");
  const contactPhoto = new ObjectState<string>("");

  return (
    <>
      <Head>
        <title>Team | Simpson & Associates</title>
      </Head>
      <SessionProvider>
        <Navbar />
        <div
          id="team"
          className="fade-in flex w-full flex-col items-center justify-center pb-14"
        >
          <LeadershipTeam emailTo={emailTo} contactPhoto={contactPhoto} />
          <SupportTeam emailTo={emailTo} contactPhoto={contactPhoto} />
        </div>
        <Contact
          className="bg-slate-50"
          emailTo={emailTo.value}
          image={contactPhoto.value}
        />
        <ScrollIndicator />
        <Bottom />
      </SessionProvider>
    </>
  );
}

/**
 * The Leadership Team
 * @returns JSX.Element
 */
const LeadershipTeam = (props: {
  emailTo: ObjectState<string>;
  contactPhoto: ObjectState<string>;
}): JSX.Element => (
  <section className="flex flex-col items-center justify-center bg-slate-50 pb-14 pt-44 text-center lg:pt-52">
    <h3 className="text-4xl font-extrabold text-primary lg:text-5xl">
      Leadership Team
    </h3>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2">
      Our leadership team is <strong>deeply dedicated</strong> to ensuring
      client satisfaction remains at the core of our business philosophy. They
      understand that our clients are the heartbeat of our success and work
      tirelessly to exceed their expectations.
    </p>
    <div className="mt-7 flex flex-wrap items-center justify-center gap-6 px-4 md:gap-12">
      {LEADERSHIP_TEAM.map((agent, i: number) => (
        <AgentCard
          key={i}
          agent={agent}
          emailTo={props.emailTo}
          contactPhoto={props.contactPhoto}
          className="hover:bg-slate-100"
        />
      ))}
    </div>
  </section>
);

/**
 * The Support Team
 * @returns JSX.Element
 */
const SupportTeam = (props: {
  emailTo: ObjectState<string>;
  contactPhoto: ObjectState<string>;
}): JSX.Element => (
  <section className="flex flex-col items-center justify-center bg-white pt-20 text-center">
    <h3 className="text-4xl font-extrabold text-primary lg:text-5xl">
      Support Team
    </h3>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-3/4 sm:text-base lg:w-1/2">
      Our support team is the cornerstone of our commitment to{" "}
      <strong>exceptional customer experiences</strong>. Led by a dedicated
      group of individuals, they are the frontline advocates for our clients,
      ensuring that their needs are met with promptness and care.
    </p>
    <div className="mt-7 flex flex-wrap items-center justify-center gap-6 px-4 md:gap-12">
      {SUPPORT_TEAM.map((agent: Agent, i: number) => (
        <AgentCard
          key={i}
          agent={agent}
          emailTo={props.emailTo}
          contactPhoto={props.contactPhoto}
          className="hover:bg-slate-50"
        />
      ))}
    </div>
  </section>
);

/**
 * Agent Card
 * @returns JSX.Element
 */
interface AgentCardProps {
  agent: any;
  emailTo: ObjectState<string>;
  contactPhoto: ObjectState<string>;
  className?: string;
}
const AgentCard = (props: AgentCardProps): JSX.Element => (
  <Link
    href="#contact"
    onClick={() => {
      props.emailTo.set(props.agent.email);
      props.contactPhoto.set(props.agent.photo);
    }}
    className={cn(
      "group relative flex h-[31.5rem] flex-col items-center  p-6 duration-500 ease-in-out hover:scale-105",
      props.className,
    )}
  >
    <Image
      src={props.agent.photo}
      alt="..."
      width={600}
      height={600}
      className="h-72 w-72 rounded-full object-cover duration-500 ease-in-out"
    />
    <h1 className="mt-3 text-3xl font-extrabold tracking-wide text-primary">
      {props.agent.name}
    </h1>
    <p className="mt-1 text-lg italic text-primary">{props.agent.title}</p>
    <p className="mt-1 text-base text-primary">{props.agent.location || ""}</p>
    <p className="mb-4 mt-1 text-base text-primary">{props.agent.lang || ""}</p>
    <button className="absolute bottom-4 w-44 rounded-full bg-secondary px-10 py-3 text-center text-sm text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110">
      Get in touch
    </button>
  </Link>
);
