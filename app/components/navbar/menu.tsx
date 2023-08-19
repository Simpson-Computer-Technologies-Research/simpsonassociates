"use client";

import React from "react";
import Link from "next/link";
import { SetState } from "@/app/lib/types";

/**
 * Navbar Menu Component
 * @returns JSX.Element
 */
export default function NavbarMenu(): JSX.Element {
  const [menuClicked, setMenuClicked] = React.useState<boolean>(false);

  return (
    <div className="block overflow-y-scroll lg:hidden">
      {MenuButton(menuClicked, setMenuClicked)}
      {menuClicked ? DropdownMenuVisible(setMenuClicked) : <></>}
    </div>
  );
}

/**
 * Menu button wrapper
 * @returns JSX.Element
 */
const MenuButton = (
  menuClicked: boolean,
  setMenuClicked: SetState<boolean>,
): JSX.Element =>
  menuClicked ? CloseButton(setMenuClicked) : OpenButton(setMenuClicked);

// Close button
const CloseButton = (setMenuClicked: SetState<boolean>): JSX.Element => (
  <div
    className="group absolute top-10 z-50 ml-8 cursor-pointer p-2 outline-tertiary active:outline-2 md:outline-none"
    onClick={() => setMenuClicked(false)}
  >
    <div className="flex flex-col items-center justify-center">
      <span className="h-1 w-10 rotate-45 rounded-lg bg-slate-950 duration-700 ease-in-out group-hover:w-11 group-hover:-rotate-45 group-hover:bg-secondary"></span>
      <span className="-mt-1 h-1 w-10 -rotate-45 rounded-lg bg-slate-950 duration-700 ease-in-out group-hover:w-11 group-hover:rotate-45 group-hover:bg-secondary"></span>
    </div>
  </div>
);

// Open Button
const OpenButton = (setMenuClicked: SetState<boolean>): JSX.Element => (
  <div
    className="group z-50 ml-8 mt-8 cursor-pointer p-2 outline-tertiary active:outline-2 md:outline-none"
    onClick={() => setMenuClicked(true)}
  >
    <div className="flex flex-col">
      <span className="h-1 w-9 rounded-lg bg-white duration-700 ease-in-out group-hover:w-16 group-hover:bg-secondary"></span>
      <span className="mt-1.5 h-1 w-9 rounded-lg bg-white duration-700 ease-in-out group-hover:w-12 group-hover:bg-secondary"></span>
      <span className="mt-1.5 h-1 w-9 rounded-lg bg-white duration-700 ease-in-out group-hover:w-8 group-hover:bg-secondary"></span>
    </div>
  </div>
);

// Dropdown menu visible
const DropdownMenuVisible = (
  setMenuClicked: SetState<boolean>,
): JSX.Element => (
  <div
    id="menu"
    className="absolute z-20 h-auto w-screen overflow-y-scroll bg-white pb-7 pt-20 shadow-xl duration-500 ease-in-out"
  >
    <NavbarMenuButton
      text="Home"
      href="/#home"
      onClick={() => setMenuClicked(false)}
    />
    <NavbarMenuButton
      text="Services"
      href="/#services"
      onClick={() => setMenuClicked(false)}
    />
    <NavbarMenuButton
      text="Agents"
      href="/#team"
      onClick={() => setMenuClicked(false)}
    />
    <NavbarMenuButton
      text="Contact"
      href="/#contact"
      onClick={() => setMenuClicked(false)}
    />
    <NavbarMenuButton
      text="Agent Login"
      href="/agents/dashboard"
      onClick={() => setMenuClicked(false)}
    />
  </div>
);

/**
 * Navbar menu button
 * @returns JSX.Element
 */
const NavbarMenuButton = (props: {
  text: string;
  href: string;
  onClick: () => void;
}): JSX.Element => (
  <div
    className="group mb-6 flex w-auto flex-col items-center justify-center text-center"
    onClick={props.onClick}
  >
    <Link
      href={props.href}
      className="px-4 py-2 text-base font-light tracking-wide text-slate-950 duration-500 ease-in-out md:text-lg"
    >
      {props.text}
    </Link>
    <span className="block h-0.5 w-0 rounded-full bg-secondary duration-500 ease-in-out group-hover:w-12"></span>
  </div>
);
