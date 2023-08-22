"use client";

import { useEffect } from "react";
import NavbarButton from "./button";
import NavbarMenu from "./menu";
import Image from "next/image";
import Link from "next/link";
import { ObjectState } from "@/lib/state";
import { NAVBAR_BUTTON_SECTION_IDS } from "@/lib/constants";

/**
 * Navbar Component
 * @returns JSX.Element
 */
export default function Navbar() {
  const underlined = new ObjectState<string>("home");

  // Set the window listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.innerWidth < 768) return;

      for (const sectionId of NAVBAR_BUTTON_SECTION_IDS) {
        const section: HTMLElement | null = document.getElementById(sectionId);
        if (!section) continue;

        const viewOffset: number = window.innerHeight * 0.5;
        const top: number = section.offsetTop - viewOffset;
        const btm: number = top + section.offsetHeight;
        const pos: number = window.scrollY;

        const atSection: boolean = pos >= top && pos < btm;
        if (atSection && sectionId !== underlined.value)
          underlined.set(sectionId);
      }
    });
  }, [underlined]);

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
          underlined={underlined}
        />
        <NavbarButton
          text="Rates"
          className="hidden xl:flex"
          href="/#rates"
          id="rates"
          underlined={underlined}
        />
        <NavbarButton
          text="Services"
          className="hidden lg:flex"
          href="/#services"
          id="services"
          underlined={underlined}
        />
        <NavbarButton
          text="Agents"
          className="hidden lg:flex"
          href="/#agents"
          id="agents"
          underlined={underlined}
        />
        <NavbarButton
          text="Contact"
          className="hidden lg:flex"
          href="/#contact"
          id="contact"
          underlined={underlined}
        />
        <Link
          href="/login?redirect=/agents/dashboard"
          rel="noopener noreferrer"
          target="_blank"
          className="hidden items-center justify-center rounded-lg border-[1px] border-secondary px-5 py-2 text-center text-sm font-extralight tracking-wide text-white duration-200 ease-in-out hover:bg-secondary hover:text-slate-950 lg:flex"
        >
          Agent Login
        </Link>
      </div>
    </nav>
  );
}
