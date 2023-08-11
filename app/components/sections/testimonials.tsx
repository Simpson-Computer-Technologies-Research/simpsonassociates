"use client";

import React from "react";
import Image from "next/image";

// Return the component
export default function Testimonials(): JSX.Element {
  // Manage the testimonials state
  const [testimonials, setTestimonials] = React.useState([]);

  // Fetch the testimonials from /api/testimonials
  React.useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((testimonials) => setTestimonials(testimonials));
  }, []);

  // Return the component jsx
  return (
    <section
      id="testimonials"
      className="group relative flex w-full flex-col items-center justify-center bg-white md:pb-7 pt-16 md:pt-20"
    >
      <Header />
      <TestimonialCards testimonials={testimonials} />
    </section>
  );
}

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <div className="flex flex-col items-center justify-center">
    <h2 className="text-5xl font-extrabold text-primary sm:text-7xl">
      Testimonials
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-center text-sm text-primary sm:w-1/2 sm:text-base">
      Trusting the right mortgage brokerage is vital. Because of our dedication
      to <strong>exceptional service</strong> and{" "}
      <strong>unwavering commitment</strong>, our clients have shared their
      experiences with us.
    </p>
  </div>
);

/**
 * Testimonial Cards Component
 * @returns JSX.Element
 */
const TestimonialCards = (props: { testimonials: any }): JSX.Element => {
  // Map the testimonials
  const testimonialCards = props.testimonials.map((testimonial: any) => (
    <TestimonialCard key={testimonial.key} testimonial={testimonial} />
  ));

  // Return the component jsx
  return (
    <div className="relative mt-2 flex h-auto w-11/12 flex-row overflow-hidden md:w-3/4">
      <div className="flex animate-marquee-current-slow flex-row">
        {testimonialCards}
      </div>
      <div className="absolute top-0 flex animate-marquee-next-slow flex-row">
        {testimonialCards}
      </div>
    </div>
  );
};

/**
 * Testimonial Card Component
 * @returns Testimonial Card Component JSX
 */
const TestimonialCard = (props: { testimonial: any }) => (
  <span className="mx-1 flex w-80 flex-col items-center rounded-xl p-4 text-center duration-500 ease-in-out hover:duration-0 xs:mx-3 md:mx-5 md:w-96 lg:w-[30rem]">
    {" "}
    {/* hover:border-secondary */}
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
    <p className="mt-5 text-xs font-medium text-primary sm:text-sm lg:text-base">
      {props.testimonial.testimonial}
    </p>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-40"></span>
  </span>
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
