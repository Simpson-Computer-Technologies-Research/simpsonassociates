"use client";

import React from "react";
import NavbarButton from "./button";
import NavbarMenu from "./menu";
import Image from "next/image";
import Link from "next/link";

/**
 * Navbar Component
 * @returns JSX.Element
 */
export default function Navbar() {
  // Manage the underlined button state
  const [underlinedButton, setUnderlinedButton] = React.useState("home");

  // Set the window listener
  React.useEffect(() => {
    const buttons: string[] = ["home", "services", "team", "contact"];

    window.addEventListener("scroll", () => {
      // If the window size is less than medium, return
      if (window.innerWidth < 768) return;

      for (const sectionId of buttons) {
        // Get the corresponding section
        const section: HTMLElement | null = document.getElementById(sectionId);
        if (!section) continue;

        const viewOffset: number = window.innerHeight * 0.5;
        const top: number = section.offsetTop - viewOffset;
        const btm: number = top + section.offsetHeight;
        const pos: number = window.scrollY;

        const atSection: boolean = pos >= top && pos < btm;
        if (atSection && sectionId !== underlinedButton)
          setUnderlinedButton(sectionId);
      }
    });
  }, [underlinedButton]);

  // Return the component jsx
  return (
    <nav className="fixed z-50 flex w-screen flex-row justify-between border-b-4 border-secondary bg-nav">
      <NavbarMenu />
      <Image
        priority={true}
        key={Math.random()}
        width={1920}
        height={1080}
        loading="eager"
        src="/images/simpson_associates_logo_noBg.png"
        alt="..."
        className="mb-6 ml-10 mr-7 mt-5 h-16 w-52 lg:mr-2 lg:h-[5.9rem] lg:w-[20rem]"
      />
      <div className="m-10 mr-10 mt-7 hidden flex-row space-x-12 lg:flex">
        <NavbarButton
          text="Home"
          className="hidden lg:flex"
          href="/#home"
          id="home"
          underlinedButton={underlinedButton}
          setUnderlinedButton={setUnderlinedButton}
        />
        <NavbarButton
          text="Services"
          className="hidden lg:flex"
          href="/#services"
          id="services"
          underlinedButton={underlinedButton}
          setUnderlinedButton={setUnderlinedButton}
        />
        <NavbarButton
          text="Team"
          className="hidden xl:flex"
          href="/#team"
          id="team"
          underlinedButton={underlinedButton}
          setUnderlinedButton={setUnderlinedButton}
        />
        <NavbarButton
          text="Agents"
          className="hidden lg:flex"
          href="/#agents"
          id="agents"
          underlinedButton={underlinedButton}
          setUnderlinedButton={setUnderlinedButton}
        />
        <NavbarButton
          text="Rates"
          className="hidden xl:flex"
          href="/#rates"
          id="rates"
          underlinedButton={underlinedButton}
          setUnderlinedButton={setUnderlinedButton}
        />
        <NavbarButton
          text="Contact"
          className="hidden lg:flex"
          href="/#contact"
          id="contact"
          underlinedButton={underlinedButton}
          setUnderlinedButton={setUnderlinedButton}
        />
        <div>
          <Link
            href="/login?redirect=/agents/dashboard"
            rel="noopener noreferrer"
            target="_blank"
            className="mt-2 hidden rounded-lg border-[1px] border-secondary px-5 py-4 text-center text-sm font-extralight tracking-wide text-white duration-200 ease-in-out hover:bg-secondary hover:text-slate-950 lg:block"
          >
            Agent Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
