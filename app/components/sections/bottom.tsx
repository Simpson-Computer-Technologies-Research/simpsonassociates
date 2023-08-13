"use client";

import React from "react";
import Image from "next/image";

/**
 * Bottom Component
 * @returns JSX.Element
 */
export default function Bottom(): JSX.Element {
  return (
    <section
      id="bottom"
      className="flex w-screen flex-col justify-between border-t-4 border-t-secondary bg-primary px-10 pb-20 md:items-center lg:flex-row lg:justify-center"
    >
      {/* Before Image, Show on larger screens */}
      <div className="relative hidden justify-center lg:flex lg:flex-row">
        <NavigationLinks />
        <Services />
      </div>

      {/* Logo */}
      <div className="flex justify-center">
        <Image
          key={Math.random()}
          width={781}
          height={736}
          loading="lazy"
          src="/images/dominion_lending_logo_noBg.png"
          alt="..."
          className="mx-5 mt-10 flex h-44 w-44"
        />
      </div>

      {/* After Image */}
      <div className="flex flex-col md:flex-row lg:flex-col">
        {/* Show on smaller screens */}
        <div className="flex flex-row justify-between lg:hidden">
          <NavigationLinks />
          <Services />
        </div>

        {/* Always show offices */}
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
      className="my-1 text-base text-para underline underline-offset-4 hover:text-secondary"
    >
      {props.text}
    </a>
  );

  // Return JSX
  return (
    <div className="mt-6 flex flex-col lg:mt-24 xl:mr-7">
      <h2 className="mb-1 text-lg font-bold tracking-wider text-white md:text-xl">
        Navigation
      </h2>
      <Link href="#home" text="Home" />
      <Link href="#services" text="Services" />
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
      className="my-1 text-sm text-para underline underline-offset-4 hover:text-secondary md:text-base"
    >
      {props.text}
    </a>
  );

  // Return JSX
  return (
    <div className="ml-8 mt-6 flex flex-col text-right md:text-left lg:mr-6 lg:mt-24 xl:mr-16">
      <h2 className="mb-1 text-lg font-bold tracking-wider text-white md:text-xl">
        Services
      </h2>
      <Button
        href="/services#residential-mortgages"
        text="Residential Mortgages"
      />
      <Button
        href="/services#commercial-mortgages"
        text="Commercial Mortgages"
      />
      <Button href="/services#refinancing" text="Refinancing" />
      <Button href="/services#access-equity" text="Access Equity" />
      <Button href="/services#second-property" text="Second Property" />
      <Button href="/services#investment-property" text="Investment Property" />
    </div>
  );
};

/**
 * Offices Component
 * @returns JSX.Element
 * @todo Link each office url to another page with the office picture and info
 */
const Offices = (): JSX.Element => {
  /**
   * Office Component
   * @param props
   * @returns JSX.Element
   */
  const Office = (props: {
    title: string;
    phone: string;
    address: string;
    className?: string;
  }): JSX.Element => (
    <div
      className={`mt-6 flex w-32 flex-col md:ml-8 md:mt-0 xl:ml-14 ${props.className}`}
    >
      <h2 className="text-base font-bold tracking-wider text-white md:text-xl">
        {props.title}
      </h2>
      <a className="my-2 text-sm text-para underline underline-offset-4 hover:text-secondary md:text-base">
        {props.phone}
      </a>
      <a className="mb-2 text-sm text-para underline underline-offset-4 hover:text-secondary md:text-base">
        {props.address}
      </a>
    </div>
  );

  // Return JSX
  return (
    <div className="mt-6 flex flex-row justify-between xl:ml-3">
      <Office
        title="Sportsworld"
        phone="+1 519-885-8852"
        address="50 Sportsworld Crossing - Unit 230"
        className="text-left"
      />
      <Office
        title="Victoria St."
        phone="+1 519-885-8852"
        address="901 Victoria St Kitchener"
        className="text-right md:text-left"
      />
    </div>
  );
};
