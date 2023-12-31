"use client";

import Link from "next/link";
import { TESTIMONIALS } from "@/lib/constants";
import { Testimonial } from "@/lib/types";

/**
 * Testimonials (Google Reviews)
 * @returns JSX.Element
 */
export default function Testimonials(): JSX.Element {
  return (
    <section
      id="testimonials"
      className="group relative flex w-full flex-col items-center justify-center bg-slate-50 pb-7 pt-14"
    >
      <Header />
      <TestimonialCards />
    </section>
  );
}

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <header className="flex flex-col items-center justify-center text-center">
    <h2 className="text-5xl font-extrabold text-primary xs:text-6xl sm:text-7xl">
      Testimonials
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mt-7 lg:w-72"></span>
    <p className="mb-6 w-3/4 text-sm text-primary sm:w-1/2 sm:text-base">
      Trusting the right mortgage brokerage is vital. Because of our dedication
      to <strong>exceptional service</strong> and{" "}
      <strong>unwavering commitment</strong>, our clients have shared their
      experiences with us.
    </p>
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href="https://www.google.com/maps/place/Dominion+Lending+Dan+Simpson+Team/@43.46332,-80.4674503,17z/data=!4m6!3m5!1s0x882bf5ff62d60f99:0xc0e42b67bd26841d!8m2!3d43.46332!4d-80.46487!16s%2Fg%2F11rv1fs0d4"
      className="mb-6 rounded-full bg-secondary px-14 py-3 text-center text-sm text-white duration-500 ease-in-out hover:animate-pulse hover:px-16 hover:brightness-110 sm:px-20 sm:text-base sm:hover:px-24"
    >
      See all
    </Link>
  </header>
);

/**
 * Testimonial Cards Component
 * @returns JSX.Element
 */
const TestimonialCards = (): JSX.Element => {
  const cards = TESTIMONIALS.map((t: Testimonial, i: number) => (
    <TestimonialCard key={i} testimonial={t} />
  ));

  // Return the component jsx
  return (
    <div className="relative mt-2 flex w-11/12 flex-row overflow-hidden md:w-3/4">
      <div className="flex animate-marquee-current-slow flex-row">{cards}</div>
      <div className="absolute top-0 flex animate-marquee-next-slow flex-row">
        {cards}
      </div>
    </div>
  );
};

/**
 * Testimonial Card Component
 * @returns Testimonial Card Component JSX
 */
const TestimonialCard = (props: { testimonial: any }) => (
  <div className="mx-1 flex w-80 flex-col items-center p-4 text-center duration-500 ease-in-out hover:bg-slate-100 hover:duration-100 xs:mx-3 xs:p-10 md:mx-5 md:w-96 lg:w-[30rem]">
    {" "}
    <h2 className="mt-5 whitespace-nowrap text-base font-bold text-primary lg:text-lg">
      {props.testimonial.name}
    </h2>
    <div className="mt-2 flex flex-row items-center justify-center space-x-1">
      <StarSVG />
      <StarSVG />
      <StarSVG />
      <StarSVG />
      <StarSVG />
    </div>
    <p className="mb-12 mt-5 text-xs font-medium text-primary sm:mb-10 sm:text-sm lg:text-base">
      {props.testimonial.testimonial}
    </p>
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={props.testimonial.href}
      className="absolute bottom-4 rounded-full bg-secondary px-14 py-3 text-center text-sm text-white duration-500 ease-in-out hover:animate-pulse hover:px-16 hover:brightness-110 sm:px-20 sm:text-base sm:hover:px-24"
    >
      See full review
    </Link>
  </div>
);

/**
 * Star SVG Component
 * @returns Star SVG Component JSX
 */
const StarSVG = (): JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-3 w-3 text-secondary sm:h-5 sm:w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 15.585l-5.959 3.025 1.14-6.629L.293 6.415l6.664-.97L10 .585l3.043 5.86 6.664.97-4.888 4.566 1.14 6.629z"
      clipRule="evenodd"
    />
  </svg>
);
