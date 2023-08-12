"use client";

import React from "react";

/**
 * Scroll Indicator Component
 * @returns JSX.Element
 */
export default function ScrollIndicator(): JSX.Element {
  const [scrollPercent, setScrollPercent] = React.useState(0);

  // Set the window listener
  React.useEffect(() => {
    window.addEventListener("scroll", () => {
      let winScroll: number =
        document.body.scrollTop || document.documentElement.scrollTop;
      let height: number =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setScrollPercent((winScroll / height) * 100);
    });
  }, []);

  // Return the component jsx
  return (
    <div className="fixed bottom-0 z-40 h-4 w-screen bg-slate-50">
      <div
        className="fixed bottom-0 h-4 bg-primary ease-in-out"
        style={{ width: `${scrollPercent}%` }}
      ></div>
    </div>
  );
}
