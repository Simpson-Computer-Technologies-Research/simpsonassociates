"use client";

import { schema } from "../../schema.module";

/**
 * Loading Component
 * @returns JSX.Element
 */
export default function LoadingCenter(): JSX.Element {
  return (
    <section className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <LoadingRelative />
    </section>
  );
}

export function LoadingRelative() {
  return (
    <svg
      className="h-20 w-20 animate-spin text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke={schema.secondary}
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill={schema.secondary}
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0
            12h4zm2 5.291A7.962 7.962 0 014 12H0c0
            3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
