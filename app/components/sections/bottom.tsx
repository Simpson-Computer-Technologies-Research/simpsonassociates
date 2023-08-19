"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

/**
 * Bottom Component
 * @returns JSX.Element
 */
export default function Bottom(): JSX.Element {
  return (
    <section
      id="bottom"
      className="relative flex w-screen flex-col justify-between border-t-4 border-t-secondary bg-primary px-7 pb-14 md:items-center xl:flex-row xl:justify-center"
    >
      <div className="mt-28 hidden justify-center gap-12 xl:flex xl:flex-row">
        <NavigationLinks />
        <Services />
      </div>

      <div className="flex flex-col items-center justify-center text-center">
        <Image
          width={700}
          height={700}
          loading="lazy"
          src="/images/simpson_associates_logo_noBg.png"
          alt="..."
          className="mx-14 mb-8 mt-10 flex h-20 w-auto xxs:h-28 xs:h-32 sm:h-44"
        />
      </div>

      <div className="flex flex-col gap-12 md:flex-row xl:flex-col">
        <div className="flex flex-row justify-between gap-12 xl:hidden">
          <NavigationLinks />
          <Services />
        </div>
        <Offices />
      </div>
    </section>
  );
}

/**
 * Navigation Links Component
 * @returns JSX.Element
 */
const NavigationLinks = (): JSX.Element => {
  /**
   * Link Component
   * @param props
   * @returns JSX.Element
   */
  const Link = (props: { text: string; href: string }): JSX.Element => (
    <a
      href={props.href}
      className="my-1 text-base text-para hover:text-secondary"
    >
      {props.text}
    </a>
  );

  // Return JSX
  return (
    <div className="flex flex-col">
      <h2 className="mb-1 text-lg font-bold tracking-wider text-white md:text-xl">
        Navigation
      </h2>
      <Link href="#home" text="Home" />
      <Link href="#services" text="Services" />
      <Link href="#agents" text="Agents" />
      <Link href="#about" text="About" />
      <Link href="#contact" text="Contact" />
    </div>
  );
};

/**
 * Services Component
 * @returns JSX.Element
 */
const Services = (): JSX.Element => {
  /**
   * Button Component
   * @param props
   * @returns JSX.Element
   */
  const Button = (props: { text: string; href: string }): JSX.Element => (
    <a
      href={props.href}
      rel="noreferrer"
      target="_blank"
      className="my-1 text-sm text-para hover:text-secondary md:text-base"
    >
      {props.text}
    </a>
  );

  // Return JSX
  return (
    <div className="flex flex-col text-right md:text-left">
      <h2 className="mb-1 text-lg font-bold tracking-wider text-white md:text-xl">
        Services
      </h2>
      <Button
        href="/services/residential-mortgages"
        text="Residential Mortgages"
      />
      <Button
        href="/services/commercial-mortgages"
        text="Commercial Mortgages"
      />
      <Button href="/services/refinancing" text="Refinancing" />
      <Button href="/services/access-equity" text="Access Equity" />
      <Button href="/services/second-property" text="Second Property" />
      <Button href="/services/investment-property" text="Investment Property" />
    </div>
  );
};

/**
 * Officess Component
 * @returns JSX.Element
 * @todo Link each office url to another page with the office picture and info
 */
const Offices = (): JSX.Element => (
  <div className="flex h-fit w-auto flex-row justify-between gap-12">
    <Office
      title="Head Office"
      phone="+1 519-885-8852"
      address="50 Sportsworld Crossing - Unit 230 Kitchener"
      className="text-left"
      href="https://www.google.com/maps/place/50+Sportsworld+Crossing+Road+Unit+230,+Kitchener,+ON+N2P+0A4/@43.4097612,-80.3969364,16.97z/data=!3m1!5s0x882b8a889ababc0f:0x8072572b7fdf209!4m6!3m5!1s0x882b8a43e63fc10f:0xcbcdb2ec22aa2a10!8m2!3d43.4097598!4d-80.3943144!16s%2Fg%2F11pvctt148?entry=ttu"
    />
    <Office
      title="Victoria St."
      phone="+1 519-885-8852"
      address="901 Victoria St N Kitchener"
      className="text-right md:text-left"
      href="https://www.google.com/maps/place/901+Victoria+St+N,+Kitchener,+ON+N2B+3C3/@43.4633473,-80.4674275,17z/data=!3m1!4b1!4m6!3m5!1s0x882bf4af40e30be9:0x41f13fdcfc7663c2!8m2!3d43.4633473!4d-80.4648526!16s%2Fg%2F11flt11t4r?entry=ttu"
    />
  </div>
);
const Office = (props: {
  title: string;
  phone: string;
  address: string;
  className?: string;
  href: string;
}): JSX.Element => (
  <div className={cn("flex h-auto w-36 flex-col", props.className)}>
    <h2 className="text-base font-bold tracking-wider text-white md:text-xl">
      {props.title}
    </h2>
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="my-2 text-sm text-para hover:text-secondary md:text-base"
    >
      {props.address}
    </a>
    <p className="mb-2 text-sm text-para hover:text-secondary md:text-base">
      {props.phone}
    </p>
  </div>
);
