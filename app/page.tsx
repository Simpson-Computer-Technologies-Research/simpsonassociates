"use client";
import Landing from "@/app/components/sections/landing";
import Cards from "@/app/components/sections/cards";
import Services from "@/app/components/sections/services";
import Navbar from "@/app/components/navbar/navbar";
import Lenders from "@/app/components/sections/lenders";
import Bottom from "@/app/components/sections/bottom";
import Team from "@/app/components/sections/team";
import Agents from "@/app/components/sections/agents";
import Testimonials from "@/app/components/sections/testimonials";
import Contact from "@/app/components/sections/contact";
import ScrollIndicator from "@/app/components/scrollIndicator";

/**
 * Home Page Component
 */
export default function Home() {
  return (
    <main>
      <Navbar />
      <Landing />
      <section className="flex flex-col items-center justify-center">
        <Cards />
        <Services />
        <Team />
        <Agents />
        <Testimonials />
        <Contact className="bg-white" />
        <Lenders />
        <Bottom />
      </section>
      <ScrollIndicator />
    </main>
  );
}
