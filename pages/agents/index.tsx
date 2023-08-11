/* eslint-disable @next/next/no-img-element */
"use client";

// Import react for state and effect
import React from "react";

// Import components
import Navbar from "@/app/components/navbar/navbar";
import Loading from "@/app/components/loading";
import ScrollIndicator from "@/app/components/scrollIndicator";
import CirclesBackground from "@/app/components/circlesBackground";

// Import tailwind and global styles
import "@/styles/globals.css";

// Import fuse.js
import Fuse from "fuse.js";

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
    // Get the query
    const query: string | null = new URLSearchParams(
      window.location.search
    ).get("query");
    if (query) setInitialQuery(query);

    // Get the agents
    fetch("/api/agents/get")
      .then((res) => (res.status === 200 ? res.json() : []))
      .then((agents) => setAgents(agents));
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
    <section>
      <Navbar />
      <div className="fade-in relative flex w-full flex-col items-center justify-center px-12 pb-16 pt-20 text-center">
        <Header />
        <AgentsComponent initialQuery={initialQuery} agents={agents} />
        <ScrollIndicator />
        <CirclesBackground />
      </div>
    </section>
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
  const [locationError, setLocationError] = React.useState("");
  const [location, setLocation] = React.useState({
    loading: false,
    active: false,
    lat: 0,
    long: 0,
  });

  /**
   * Fetch user's location
   *
   * @return {void}
   */
  function getLocation(): void {
    // If the user is already searching by location, return
    if (location.active) return;

    // If the user has already searched by location but
    // the location is not active, set the location to active
    if (location.lat && location.long)
      setLocation({ ...location, active: true, loading: false });

    // Otherwise, get the users location
    if (navigator.geolocation) {
      setLocation({ ...location, loading: true });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;
          setLocation({
            loading: false,
            active: true,
            lat: lat,
            long: long,
          });
        },
        (error) => setLocationError(error.message)
      );
    } else setLocationError("Geolocation not supported");
  }

  /**
   * Set the url query param
   * @param query - The query to set
   */
  const setUrlQueryParam = (query: string) => {
    if (window) window.history.pushState({}, "", `/agents?query=${query}`);
  };

  // Render the component jsx
  return (
    <section className="relative z-10">
      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center space-x-4">
          <input
            className="mb-4 w-60 rounded-md border-2 border-gray-300 p-2 text-gray-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-secondary xs:w-96"
            type="text"
            defaultValue={props.initialQuery}
            placeholder="Enter an agent name, city, or language"
            onChange={(e) => {
              setQuery(e.target.value);
              setUrlQueryParam(e.target.value);
              if (location.active) setLocation({ ...location, active: false });
            }}
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={getLocation}
            className="mb-4 w-60 rounded-md bg-tertiary p-2 text-base text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 xs:w-96"
          >
            {location.loading
              ? "Fetching Location"
              : location.active
              ? "Location Active"
              : "Use My Location"}
          </button>
          <p className="text-sm font-semibold text-red-500">{locationError}</p>
        </div>
      </div>
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
  <div className="mt-36 flex flex-col items-center justify-center">
    <h2 className="text-7xl font-extrabold text-primary lg:text-8xl">Agents</h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-base text-primary sm:w-1/2">
      Our agents are here to help you find the perfect home. Use the search
      filters to find the right agent for you.
    </p>
  </div>
);

/**
 * Get the distance between agents
 * @param a - The first agent long/lat
 * @param b - The second agent long/lat
 */
const deg2rad = (deg: number) => deg * (Math.PI / 180);
const getDistance = (
  a: { lat: number; long: number },
  b: { lat: number; long: number }
) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(b.lat - a.lat);
  const dLon = deg2rad(b.long - a.long);
  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(a.lat)) *
      Math.cos(deg2rad(b.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  const d = R * c; // Distance in km
  return d;
};

/**
 * Agents Grid Component
 * @returns JSX.Element
 */
const AgentsGrid = (props: {
  agents: any[];
  query: string;
  location: {
    active: boolean;
    lat: number;
    long: number;
  };
}): JSX.Element => {
  let results: any[] = props.agents; // The search results

  // If there is a query and no location
  if (props.query && !props.location.active) {
    // Create the fuse instance
    const fuse = new Fuse(props.agents, {
      includeScore: true,
      keys: ["region.location", "name", "title", "lang"],
    });

    // Get the search results
    results = fuse.search(props.query);
  }

  // If the location is active, then get the closest agents
  if (props.location.active) {
    // Get the closest agents
    results = props.agents
      .map((agent) => {
        const distance = getDistance(
          {
            lat: props.location.lat,
            long: props.location.long,
          },
          {
            lat: agent.region.lat,
            long: agent.region.long,
          }
        );
        return { ...agent, distance };
      })
      .sort((a, b) => a.distance - b.distance);
  }

  // Render the component jsx
  return (
    <div className="mt-7 flex flex-col items-center justify-center">
      <div className="grid grid-cols-2 justify-center sm:grid-cols-3 lg:flex lg:flex-row lg:flex-wrap">
        {results.map((item: any, i: number) => {
          return <AgentCard key={i} agent={item.item || item} />;
        })}
      </div>
    </div>
  );
};

/**
 * Agent Card Component
 * @returns JSX.Element
 */
const AgentCard = (props: {
  agent: {
    name: string;
    title: string;
    level: number;
    photo: string;
    lang: string;
    license: string;
    region: {
      location: string;
      long: number;
      lat: number;
    };
  };
}): JSX.Element => (
  <div className="group m-6 flex cursor-pointer flex-col items-center justify-center duration-700 ease-in-out hover:scale-105">
    <img
      src={props.agent.photo}
      alt="..."
      width={150}
      height={150}
      className="h-16 w-16 rounded-full xs:h-28 xs:w-28 md:h-32 md:w-32 lg:h-40 lg:w-40"
    />
    <h3 className="mt-4 font-extrabold tracking-wide text-primary lg:text-xl">
      {props.agent.name}
    </h3>
    <p className="mt-1 text-sm text-primary lg:text-base">
      {props.agent.title} - Level {props.agent.level}
    </p>
    <p className="mt-1 text-xs text-primary">{props.agent.license}</p>
    <p className="mt-1 text-xs text-primary opacity-0 delay-100 duration-500 ease-in-out group-hover:opacity-100 group-hover:delay-0 lg:text-sm">
      {props.agent.region.location}
    </p>
    <p className="mt-1 text-xs text-primary opacity-0 duration-500 ease-in-out group-hover:opacity-100 group-hover:delay-100 lg:text-sm">
      {props.agent.lang}
    </p>
  </div>
);
