// Import tailwind and global styles
import "@/app/styles/globals.css";
import { Agent, AgentLocation } from "./types";
import { ObjectState } from "./state";

/**
 * Fetch user's location
 * @param loc - The location object
 * @param error - The error object
 * @return void
 */
export const getLocation = (
  loc: ObjectState<AgentLocation>,
  error: ObjectState<string>,
) => {
  // If the user is already searching by location, return
  if (loc.value.active) return;

  // If the user has already searched by location but
  // the location is not active, set the location to active
  if (loc.value.lat && loc.value.lon) {
    loc.set({ ...loc.value, active: true, loading: false });
  }

  // Otherwise, get the users location
  if (navigator.geolocation) {
    loc.set({ ...loc.value, loading: true });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        loc.set({
          loading: false,
          active: true,
          lat: lat,
          lon: lon,
        });
      },
      (err) => error.set(err.message),
    );
  } else {
    error.set("Geolocation not supported");
  }
};

/**
 * Get the distance between agents
 * @param a - The first agent lon/lat
 * @param b - The second agent lon/lat
 */
const deg2rad = (deg: number) => deg * (Math.PI / 180);
const getDistance = (
  a: { lat: number; lon: number },
  b: { lat: number; lon: number },
) => {
  const R = 100; // Distance radius in km
  const dLat = deg2rad(b.lat - a.lat);
  const dLon = deg2rad(b.lon - a.lon);
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
 * Get the agents sorted by distance
 * @param agents The agents to sort
 * @param userLocation The user's location
 * @returns The agents sorted by distance
 */
interface Location {
  lat: number;
  lon: number;
}
export const nearbyAgents = (agents: Agent[], userLocation: Location) => {
  return agents
    .map((agent) => {
      const distance = getDistance(
        {
          lat: userLocation.lat as number,
          lon: userLocation.lon as number,
        },
        {
          lat: agent.region.lat as number,
          lon: agent.region.lon as number,
        },
      );
      return { ...agent, distance };
    })
    .sort((a, b) => a.distance - b.distance);
};
