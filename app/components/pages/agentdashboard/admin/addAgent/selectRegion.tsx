import React from "react";

import { Agent } from "@/app/lib/types";

/**
 * Select Region Component
 * @returns JSX.Element
 */
export default function SelectRegion(props: {
  agent: Agent | null;
  regionRef: React.MutableRefObject<any>;
}): JSX.Element {
  const [regions, setRegions] = React.useState<any[]>([]);
  const [input, setInput] = React.useState<string>(
    props.regionRef.current && props.regionRef.current.location,
  );
  const [location, setLocation] = React.useState<{
    location: string;
    lat: number;
    long: number;
  }>(props.agent ? props.agent.region : { location: "", lat: 0, long: 0 });
  props.regionRef.current = location;

  const onSearch = () => {
    if (!input) return;

    const url: string = "https://geocode.maps.co/search?q=Kitchener";
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (!json) return;
        const slicedJson: any[] = json.slice(0, 3);
        setRegions(slicedJson);
      });
  };

  const onRegionSelect = (region: any) => {
    let { lat, lon } = region;
    setLocation({ lat, long: lon, location: input });
    setRegions([]);
  };

  return (
    <>
      <div className="flex flex-row gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full rounded-md bg-white px-2 py-2 font-medium"
          placeholder="Enter Region (Example: Kitchener)"
        />
        <button
          onClick={onSearch}
          className="w-full rounded-md bg-white px-2 py-2 font-medium"
        >
          Search for region
        </button>
      </div>
      <div className="mt-2 flex flex-col gap-2">
        {regions &&
          regions.map((region, i: number) => (
            <button
              onClick={() => onRegionSelect(region)}
              key={region.place_id}
              className="w-full rounded-md bg-white px-2 py-2 text-left font-medium hover:bg-slate-200"
            >
              {region.display_name}
            </button>
          ))}
      </div>
      {location.location && (
        <p className="mt-1 text-white">
          Selected Region: {location.location} ({location.lat}, {location.long})
        </p>
      )}
    </>
  );
}
