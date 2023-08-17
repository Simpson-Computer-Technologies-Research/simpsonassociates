/* eslint-disable @next/next/no-img-element */
import React from "react";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

// Import components
import Navbar from "@/app/components/navbar/navbar";
import LoadingCenter from "@/app/components/loading";
import ScrollIndicator from "@/app/components/scrollIndicator";
import Contact from "@/app/components/sections/contact";
import Bottom from "@/app/components/sections/bottom";
import "@/app/styles/globals.css";

import { fetchAgents, getLocation, nearbyAgents } from "@/app/lib/location";
import { Agent, SetState } from "@/app/lib/types";
import Fuse from "fuse.js";

/**
 * Get the agents that match the query
 * @param agents The agents to search through
 * @param query The query to search for
 * @returns The agents that match the query
 */
export const fuzzySearch = (agents: Agent[], query: string) => {
  const fuse = new Fuse(agents, {
    keys: ["region.location", "name", "title", "lang"],
  });
  return fuse.search(query);
};

/**
 * Set the query in the url
 * @param query The query to set in the url
 */
const setUrlQueryParam = (query: string) => {
  if (window) window.history.pushState({}, "", `/agents?query=${query}`);
};

/**
 * Get the query param from the url
 * @returns The query param from the url
 */
const getUrlQueryParam = () =>
  new URLSearchParams(window.location.search).get("query");

/**
 * Agents Page
 * @returns JSX.Element
 */
export default function AgentsPage(): JSX.Element {
  const [initialQuery, setInitialQuery] = React.useState("");
  const [agents, setAgents] = React.useState([]);
  const [emailTo, setEmailTo] = React.useState("");

  React.useEffect(() => {
    const query = getUrlQueryParam();
    if (query && !initialQuery) setInitialQuery(query);

    if (!agents.length) {
      fetchAgents().then((res) => {
        if (res.length) setAgents(res);
      });
    }
  }, []);

  if (!agents.length) {
    return (
      <>
        <Head>
          <title>Agents | Simpson & Associates</title>
        </Head>
        <section>
          <Navbar />
          <LoadingCenter />
        </section>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Agents | Simpson & Associates</title>
      </Head>
      <SessionProvider>
        <Navbar />
        <div className="fade-in relative flex w-full flex-col px-12 pb-16 pt-20">
          <Header />
          <Agents
            initialQuery={initialQuery}
            agents={agents}
            setEmailTo={setEmailTo}
          />
        </div>
        <Contact className="bg-slate-50" emailTo={emailTo} />
        <ScrollIndicator />
        <Bottom />
      </SessionProvider>
    </>
  );
}

/**
 * Agents Component
 * @returns JSX.Element
 */
const Agents = (props: {
  initialQuery: string;
  agents: Agent[];
  setEmailTo: SetState<string>;
}): JSX.Element => {
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState("");
  const [location, setLocation] = React.useState({
    loading: false,
    active: false,
    lat: 0,
    long: 0,
  });

  return (
    <section className="relative z-10 mt-4 flex flex-col items-center justify-center">
      <input
        className="mb-4 w-60 border-b-[2.5px] border-b-primary p-2 text-gray-800 focus:border-transparent focus:outline-none focus:ring-[2.5px] focus:ring-primary xs:w-96"
        type="text"
        defaultValue={props.initialQuery}
        placeholder="Enter an agent name, city, or language"
        onChange={(e) => {
          setQuery(e.target.value);
          setUrlQueryParam(e.target.value);
          if (location.active) setLocation({ ...location, active: false });
        }}
      />
      <button
        onClick={() => getLocation(location, setLocation, setError)}
        className="mb-4 w-60 bg-primary p-2 text-base text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96"
      >
        {location.loading
          ? "Fetching Location"
          : location.active
          ? "Location Active"
          : "Use My Location"}
      </button>
      <p className="text-sm font-semibold text-red-500">{error}</p>
      <AgentsGrid
        query={query || props.initialQuery}
        agents={props.agents}
        location={location}
        setEmailTo={props.setEmailTo}
      />
    </section>
  );
};

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <div className="mt-24 flex flex-col items-center justify-center text-center lg:mt-36">
    <h2 className="text-7xl font-extrabold text-primary lg:text-8xl">Agents</h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-base text-primary sm:w-1/2">
      Our agents are here to help you find the perfect home. Use the search
      filters to find the right agent for you.
    </p>
  </div>
);

/**
 * Agents Grid Component
 * @returns JSX.Element
 */
const AgentsGrid = (props: {
  agents: Agent[];
  query: string;
  location: any;
  setEmailTo: SetState<string>;
}): JSX.Element => {
  let results: any[] = props.agents;

  if (props.query && !props.location.active) {
    results = fuzzySearch(props.agents, props.query);
  }

  if (props.location.active) {
    results = nearbyAgents(props.agents, {
      lat: props.location.lat,
      long: props.location.long,
    });
  }

  return (
    <div className="mt-12 grid grid-cols-1 xs:grid-cols-2 xs:justify-center sm:grid-cols-3 md:flex md:flex-wrap">
      {results.map((item: any, i: number) => {
        return (
          <AgentCard
            key={i}
            agent={item.item || item}
            setEmailTo={props.setEmailTo}
          />
        );
      })}
    </div>
  );
};

/**
 * Agent Card Component
 * @returns JSX.Element
 */
const AgentCard = (props: { agent: Agent; setEmailTo: SetState<string> }) => (
  <a
    href="#contact"
    onClick={() => props.setEmailTo(props.agent.email)}
    className="group mb-24 flex cursor-pointer flex-col text-left duration-500 ease-in-out hover:scale-105 xs:mx-7 xs:mb-8"
  >
    <img
      src={props.agent.photo}
      alt="..."
      width={150}
      height={150}
      className="h-32 w-32 rounded-full lg:h-40 lg:w-40"
    />
    <h3 className="mt-4 font-extrabold tracking-wide text-primary lg:text-xl">
      {props.agent.name}
    </h3>
    <p className="mt-1 text-xs text-primary xs:text-sm lg:text-base">
      {props.agent.title} - Level {props.agent.level}
    </p>
    <p className="mt-1 text-xs text-primary">{props.agent.license}</p>
    <p className="mt-3 text-sm text-primary">
      {props.agent.region && props.agent.region.location}
    </p>
    <p className="mt-1 text-sm text-primary">{props.agent.lang}</p>
    <button className="mt-4 w-fit rounded-full bg-secondary px-10 py-3 text-sm text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110">
      Contact
    </button>
  </a>
);
