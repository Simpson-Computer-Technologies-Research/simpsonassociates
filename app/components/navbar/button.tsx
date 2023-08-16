"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/app/lib/utils";

/**
 * Navbar Button Component
 * @returns JSX.Element
 */
export default function NavbarButton(props: {
  className?: string;
  text: string;
  href: string;
  id: string;
  underlinedButton: string;
  setUnderlinedButton: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element {
  const underlineWidth: string =
    props.underlinedButton === props.id ? "w-12" : "w-0";

  return (
    <div
      className={cn(
        "navbar-button group flex-col items-center justify-center text-center",
        props.className,
      )}
    >
      <Link
        href={props.href}
        onClick={() => props.setUnderlinedButton(props.id)}
        className="py-2 text-base font-medium tracking-widest text-white duration-500 ease-in-out"
      >
        {props.text.toUpperCase()}
      </Link>
      <span
        className={`h-0.5 bg-secondary group-hover:w-12 ${underlineWidth} block rounded-full duration-500 ease-in-out`}
      ></span>
    </div>
  );
}
