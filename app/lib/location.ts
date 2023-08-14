// Import tailwind and global styles
import "@/app/styles/globals.css";

// Import fuse.js
import Fuse from "fuse.js";

/**
 * Fetch the agents from the api
 * @returns Agents
 */
export const fetchAgents = async () => {
  return await fetch("/api/agents")
    .then((res) => (res.status === 200 ? res.json() : { result: [] }))
    .then((json) => json.result);
};

/**
 * Fetch user's location
 *
 * @return {void}
 */
export const getLocation = (loc: any, setLoc: any, setErr: any): void => {
  // If the user is already searching by location, return
  if (loc.active) return;

  // If the user has already searched by location but
  // the location is not active, set the location to active
  if (loc.lat && loc.long) {
    setLoc({ ...location, active: true, loading: false });
  }

  // Otherwise, get the users location
  if (navigator.geolocation) {
    setLoc({ ...location, loading: true });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const long = position.coords.longitude;
        setLoc({
          loading: false,
          active: true,
          lat: lat,
          long: long,
        });
      },
      (error) => setErr(error.message),
    );
  } else {
    setErr("Geolocation not supported");
  }
};

/**
 * Get the distance between agents
 * @param a - The first agent long/lat
 * @param b - The second agent long/lat
 */
const deg2rad = (deg: number) => deg * (Math.PI / 180);
const getDistance = (
  a: { lat: number; long: number },
  b: { lat: number; long: number },
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
 * Get the agents that match the query
 * @param agents The agents to search through
 * @param query The query to search for
 * @returns The agents that match the query
 */
export const fuzzySearch = (agents: any[], query: string) => {
  const fuse = new Fuse(agents, {
    keys: ["region.location", "name", "title", "lang"],
  });
  return fuse.search(query);
};

/**
 * Get the agents sorted by distance
 * @param agents The agents to sort
 * @param userLocation The user's location
 * @returns The agents sorted by distance
 */
export const nearbyAgents = (agents: any[], userLocation: any) => {
  return agents
    .map((agent) => {
      const distance = getDistance(
        {
          lat: userLocation.lat,
          long: userLocation.long,
        },
        {
          lat: agent.region.lat,
          long: agent.region.long,
        },
      );
      return { ...agent, distance };
    })
    .sort((a, b) => a.distance - b.distance);
};
