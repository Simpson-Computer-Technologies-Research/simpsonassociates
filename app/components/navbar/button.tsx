"use client";
import Link from "next/link";
import { cn } from "@/app/lib/utils";
import { ObjectState } from "@/app/lib/state";

/**
 * Navbar Button Component
 * @returns JSX.Element
 */
interface NavbarButtonProps {
  className?: string;
  text: string;
  href: string;
  id: string;
  underlined: ObjectState<string>;
}
export default function NavbarButton(props: NavbarButtonProps): JSX.Element {
  const underlineWidth: string =
    props.underlined.value === props.id ? "w-12" : "w-0";

  return (
    <div
      className={cn(
        "navbar-button group flex-col items-center justify-center text-center",
        props.className,
      )}
    >
      <Link
        href={props.href}
        onClick={() => props.underlined.set(props.id)}
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
