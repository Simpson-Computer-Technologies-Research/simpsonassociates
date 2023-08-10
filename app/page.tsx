"use client";

import React from "react";

import Landing from "./components/sections/landing";
import Loading from "./components/loading";
import Cards from "./components/sections/cards";
import Services from "./components/sections/services";
import Navbar from "./components/navbar/navbar";
import Lenders from "./components/sections/lenders";
import Bottom from "./components/sections/bottom";
import About from "./components/sections/about";
import Agents from "./components/sections/agents";
import Testimonials from "./components/sections/testimonials";
import Contact from "./components/sections/contact";
import ScrollIndicator from "./components/scrollIndicator";

/**
 * Home Page Component
 */
export default function Home() {
  /*

    Page Layout:

      * Landing (Main Section)
      * Cards (Small Section)
      * Services (Main Section)
      * Lenders (Small Section)
      * About (Main Section)
      * Agents (Small Section)
      * Contact (Email Form) (Main Section)
      * Testimonials (Small Section)
      * Join Us (Small Section)
      * Bottom (Small Section)
  */

  // Create state for loading
  const [loading, setLoading] = React.useState(true);

  // On mount
  React.useEffect(() => {
    setTimeout(() => setLoading(false), 200);
  }, []);

  // Return the loading component if loading
  if (loading)
    return (
      <section>
        <Navbar />
        <Loading />
      </section>
    );

  // Return the landing page if not loading
  return (
    <main>
      <Navbar />
      <Landing />
      <section className="flex flex-col items-center justify-center">
        <Cards />
        <Services />
        <Lenders />
        <About />
        <Agents />
        <Contact />
        <Testimonials />
        <Bottom />
      </section>
      <ScrollIndicator />
    </main>
  );
}
