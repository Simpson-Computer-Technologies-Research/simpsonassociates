import React from "react";

import { Agent } from "@/app/lib/types";

/**
 * Select Region Component
 * @returns JSX.Element
 */
interface Location {
  location: string;
  lat: number;
  long: number;
}
interface SelectRegionProps {
  agent: Agent | null;
  regionRef: React.MutableRefObject<Location>;
}
export default function SelectRegion(props: SelectRegionProps): JSX.Element {
  const [input, setInput] = React.useState<string>("");
  const [geo, setGeo] = React.useState<any[]>([]);
  const [loc, setLoc] = React.useState<any>({});
  props.regionRef.current = loc;

  const onSearch = () => {
    if (!input) return;

    const url: string = "https://geocode.maps.co/search?q=" + input;
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        if (!json) return;
        setGeo(json.slice(0, 3));
      });
  };

  const onRegionSelect = (region: any) => {
    let { lat, lon } = region;
    if (!lat || !lon) return;
    setGeo([]);
    setLoc({
      location: region.display_name,
      lat,
      long: lon,
    });
  };

  return (
    <div>
      <div className="flex flex-row gap-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
      {props.regionRef.current && props.regionRef.current.location && (
        <p className="text-white">
          Selected Region: {props.regionRef.current.location} (
          {props.regionRef.current.lat}, {props.regionRef.current.long})
        </p>
      )}
    </div>
  );
}
