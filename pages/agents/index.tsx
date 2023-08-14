/* eslint-disable @next/next/no-img-element */
import React from "react";
import { SessionProvider } from "next-auth/react";

// Import components
import Navbar from "@/app/components/navbar/navbar";
import Loading from "@/app/components/loading";
import ScrollIndicator from "@/app/components/scrollIndicator";
import Contact from "@/app/components/sections/contact";

import {
  fetchAgents,
  fuzzySearch,
  getLocation,
  nearbyAgents,
} from "@/app/lib/location";

// Import tailwind and global styles
import "@/app/styles/globals.css";

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
export default function Agents(): JSX.Element {
  // Manage states
  const [initialQuery, setInitialQuery] = React.useState("");
  const [agents, setAgents] = React.useState([]);

  // React effect
  React.useEffect(() => {
    const query = getUrlQueryParam();
    if (query) setInitialQuery(query);

    // Get the agents
    fetchAgents().then((agents: any) => setAgents(agents));
  }, []);

  // If the agents are not loaded yet
  if (!agents.length)
    return (
      <section>
        <Navbar />
        <Loading />
      </section>
    );

  // Render the agents page
  return (
    <SessionProvider>
      <Navbar />
      <div className="fade-in relative flex w-full flex-col px-12 pb-16 pt-20">
        <Header />
        <AgentsComponent initialQuery={initialQuery} agents={agents} />
      </div>
      <Contact bgColor={"bg-slate-50"} />
      <ScrollIndicator />
    </SessionProvider>
  );
}

/**
 * Search Filters Component. Can use Postal COde, City, or Agent Name
 * @returns JSX.Element
 */
const AgentsComponent = (props: {
  initialQuery: string;
  agents: any;
}): JSX.Element => {
  // Manage the query and location state
  const [query, setQuery] = React.useState("");
  const [error, setError] = React.useState("");
  const [location, setLocation] = React.useState({
    loading: false,
    active: false,
    lat: 0,
    long: 0,
  });

  // Render the component jsx
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
      />
    </section>
  );
};

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <div className="mt-36 flex flex-col items-center justify-center text-center">
    <h2 className="text-7xl font-extrabold text-primary lg:text-8xl">Agents</h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
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
  agents: any[];
  query: string;
  location: any;
}): JSX.Element => {
  let results: any[] = props.agents; // The search results

  // If there is a query and no location
  if (props.query && !props.location.active) {
    results = fuzzySearch(props.agents, props.query);
  }

  // If the location is active, then get the closest agents
  if (props.location.active) {
    results = nearbyAgents(props.agents, {
      lat: props.location.lat,
      long: props.location.long,
    });
  }

  // Render the component jsx
  return (
    <div className="mt-12 grid grid-cols-1 xs:grid-cols-2 xs:justify-center sm:grid-cols-3 md:flex md:flex-wrap">
      {results.map((item: any, i: number) => {
        return <AgentCard key={i} agent={item.item || item} />;
      })}
    </div>
  );
};

/**
 * Agent Card Component
 * @returns JSX.Element
 */
const AgentCard = (props: { agent: any }): JSX.Element => (
  <div className="group mb-24 flex cursor-pointer flex-col text-left xs:mx-7 xs:mb-8">
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
    <p className="mt-3 text-sm text-primary">{props.agent.region.location}</p>
    <p className="mt-1 text-sm text-primary">{props.agent.lang}</p>
  </div>
);
