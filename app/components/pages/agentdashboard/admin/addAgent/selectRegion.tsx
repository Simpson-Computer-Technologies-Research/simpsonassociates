"use client";

import { useState } from "react";
import { Agent, Region } from "@/lib/types";
import { ObjectState } from "@/lib/state";

/**
 * Select Region Component
 * @returns JSX.Element
 */
interface SelectRegionProps {
  agent: Agent | null;
  region: ObjectState<Region | null>;
}
export default function SelectRegion(props: SelectRegionProps): JSX.Element {
  const [geo, setGeo] = useState<any[]>([]);

  const onSearch = (): void => {
    const input = document.getElementById("region") as HTMLInputElement;
    if (!input.value) return;

    const url: string = "https://geocode.maps.co/search?q=" + input.value;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (!json) return;
        setGeo(json.slice(0, 3));
      });
  };

  const onRegionSelect = (result: any) => {
    const input = document.getElementById("region") as HTMLInputElement;
    if (!input.value) return;

    props.region.set({
      lat: (props.region.value && props.region.value.lat) || 0.0,
      lon: (props.region.value && props.region.value.lon) || 0.0,
      location: input.value,
    });

    const { lat, lon } = result;
    if (!lat || !lon) return;

    setGeo([]);

    props.region.set({
      location: input.value,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
    });
  };

  return (
    <div>
      <div className="flex flex-row gap-4">
        <input
          type="text"
          id="region"
          className="w-full rounded-md bg-white px-2 py-2"
          placeholder="Enter Region (Example: Kitchener)"
        />
        <button
          onClick={onSearch}
          className="w-full rounded-md bg-white px-2 py-2 text-primary hover:bg-slate-200"
        >
          Search for region
        </button>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {geo.map((region) => (
          <button
            onClick={() => onRegionSelect(region)}
            key={region.place_id}
            className="w-full rounded-md bg-white px-2 py-2 text-left hover:bg-slate-200"
          >
            {region.display_name}
          </button>
        ))}
      </div>
      {props.region.value && props.region.value.location && (
        <p className="text-white">
          Selected Region: {props.region.value.location} (
          {props.region.value.lat}, {props.region.value.lon})
        </p>
      )}
    </div>
  );
}
