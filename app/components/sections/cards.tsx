"use client";

import React from "react";
import { cn } from "@/app/lib/utils";
import { LoadingRelative } from "../loading";
import { Rate } from "@/app/lib/types";

/**
 * Cards Component
 * @returns JSX.Element
 */
export default function Cards(): JSX.Element {
  return (
    <div
      id="cards"
      className="relative z-0 flex w-screen flex-col items-center justify-center bg-slate-50"
    >
      <div className="grid grid-cols-1 px-10 py-8 md:grid-cols-2 md:px-14 lg:grid-cols-3">
        <Card
          className="my-5 w-full rounded-l-xl rounded-r-xl md:rounded-r-none md:border-r-2 md:border-r-slate-100"
          title="Calculators"
          description="Our Interactive Mortgage Calculators will allow you to explore 
            your Mortgage options to make the right home financing decision."
          button={{
            href: "https://calculators.dominionlending.ca/",
            text: "Start Calculating",
            target: "_blank",
          }}
        />
        <Card
          className="my-5 w-full rounded-l-xl rounded-r-xl md:rounded-l-none lg:rounded-r-none lg:border-r-2 lg:border-r-slate-100"
          title="Apply"
          description="Applying for a mortgage couldn’t be easier. 
            Just complete our secure application and we will be in touch shortly."
          button={{
            href: "https://velocity-client.newton.ca/en/client/journey/home?shortCode=1c12wgprkn05s",
            text: "Apply Now",
            target: "_blank",
          }}
        />
        <Card
          className="my-5 w-full rounded-l-xl rounded-r-xl md:w-[200%] md:px-40 lg:w-full lg:rounded-l-none"
          title="Join Us"
          description="We're always looking for talented individuals to join our team. Contact us if you're interested in a career with us."
          button={{
            href: "#contact",
            text: "Contact Us",
            target: "",
          }}
        />
      </div>
      <RatesCard />
    </div>
  );
}

/**
 * Card Props
 * @param title
 * @param description
 * @param button => { href, text }
 * @param className
 * @returns Card Component JSX
 */
interface CardProps {
  title: string;
  description: string;
  button: {
    href: string;
    text: string;
    target: string;
  };
  className: string;
}

/**
 * Card Component
 * @param props
 */
const Card = (props: CardProps): JSX.Element => (
  <section
    className={cn(
      "group z-[1] bg-white p-10 py-10 sm:py-16 lg:p-12",
      props.className,
    )}
  >
    <div className="flex flex-col items-center justify-center text-center duration-500 ease-in-out group-hover:-translate-y-3">
      <h1 className="mb-4 text-4xl font-extrabold text-primary">
        {props.title}
      </h1>
      <span className="mb-4 h-[3px] w-28 rounded-full bg-secondary duration-500 ease-in-out group-hover:w-40"></span>
      <p className="text-sm text-primary sm:text-base">{props.description}</p>
      <a
        href={props.button.href}
        rel="noopener noreferrer"
        target={props.button.target}
        className="mt-7 rounded-full bg-secondary px-8 py-3 text-base font-medium tracking-wider text-white outline-2 outline-tertiary duration-500 ease-in-out hover:animate-pulse hover:px-10 hover:brightness-[1.05] md:outline-none"
      >
        {props.button.text}
      </a>
    </div>
  </section>
);

/**
 * Rates Card Component
 * @returns JSX.Element
 */
const RatesCard = (): JSX.Element => {
  // convert React.useState<Rate[]>([]) to an object with get, and set
  React.useState<Rate[]>([]);

  const [rates, setRates] = React.useState<Rate[]>([]);
  React.useEffect(() => {
    if (rates.length) return;

    fetch("/api/rates")
      .then((res) => res.json())
      .then((json) => {
        if (!json || json.error) return;

        const half = Math.ceil(json.length / 2);
        const res = [...json].splice(0, half);
        setRates(res);
      });
  }, []);

  return (
    <section className="group z-[1] mx-10 mb-10 rounded-xl bg-white p-10 py-10 sm:py-16 md:mx-14 lg:p-12">
      <div className="flex flex-col items-center justify-center text-center duration-500 ease-in-out">
        <h1 className="mb-4 text-4xl font-extrabold text-primary">Rates</h1>
        <span className="mb-4 h-[3px] w-28 rounded-full bg-secondary duration-500 ease-in-out group-hover:w-40"></span>
        <p className="mb-8 w-9/12 text-sm text-primary sm:text-base lg:w-1/2">
          Our rates are always competitive and we pride ourselves on making sure
          that you get the best possible rate available to you.
        </p>
        {!rates.length ? <LoadingRelative /> : <RatesTable rates={rates} />}
      </div>
    </section>
  );
};

/**
 * Rates table
 * @param rates
 * @returns JSX.Element
 */
const RatesTable = (props: { rates: Rate[] }): JSX.Element => {
  return (
    <table id="rates" className="w-full text-sm text-primary sm:text-base">
      <thead className="border-b-2 border-slate-100">
        <tr className="text-left">
          <th className="px-2 py-2 font-bold">Term</th>
          <th className="px-2 py-2 font-medium">Bank Rate</th>
          <th className="px-2 py-2 font-bold">Our Rate</th>
          <th className="px-2 py-2 font-medium">Monthly Payment</th>
          <th className="px-2 py-2 font-bold">Savings</th>
        </tr>
      </thead>
      <tbody>
        {props.rates.map((rate, i) => {
          if (!rate.BankRate || !rate.OurRate) return <></>;
          return (
            <tr key={rate.id} className="border-b-2 border-slate-100">
              <td className="px-2 py-2 font-bold">{rate.Terms}</td>
              <td className="px-2 py-2">{rate.BankRate}</td>
              <td className="px-2 py-2 font-bold">{rate.OurRate}</td>
              <td className="px-2 py-2">{rate.OurMonthly}</td>
              <td className="px-2 py-2 font-bold">{rate.Savings}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
