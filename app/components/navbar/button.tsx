"use client";

import React from "react";
import Link from "next/link";

/**
 * Navbar Button Component
 * @returns JSX.Element
 */
export default function NavbarButton(props: {
  text: string;
  href: string;
  id: string;
  underlinedButton: string;
  setUnderlinedButton: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const underlineWidth: string =
    props.underlinedButton === props.id ? "w-12" : "w-0";

  return (
    <div className="navbar-button group hidden flex-col items-center justify-center text-center lg:flex">
      <Link
        href={props.href}
        onClick={() => props.setUnderlinedButton(props.id)}
        className="py-2 text-base font-semibold tracking-widest text-white duration-500 ease-in-out"
      >
        {props.text.toUpperCase()}
      </Link>
      <span
        className={`h-0.5 bg-secondary group-hover:w-12 ${underlineWidth} block rounded-full duration-500 ease-in-out`}
      ></span>
    </div>
  );
}
