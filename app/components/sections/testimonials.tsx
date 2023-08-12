"use client";

import React from "react";
import Link from "next/link";

// Return the component
export default function Testimonials(): JSX.Element {
  // Manage the testimonials state
  // const [testimonials, setTestimonials] = React.useState([]);

  // Fetch the testimonials from /api/testimonials
  /*React.useEffect(() => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((testimonials) => setTestimonials(testimonials));
  }, []);*/

  // Get the testimonials
  const testimonials: any[] = getTestimonials();

  // Return the component jsx
  return (
    <section
      id="testimonials"
      className="group relative flex w-full flex-col items-center justify-center bg-white pb-7 pt-16 md:pt-20"
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
  <header className="flex flex-col items-center justify-center text-center">
    <h2 className="text-5xl font-extrabold text-primary xs:text-6xl sm:text-7xl">
      Testimonials
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-sm text-primary sm:w-1/2 sm:text-base">
      Trusting the right mortgage brokerage is vital. Because of our dedication
      to <strong>exceptional service</strong> and{" "}
      <strong>unwavering commitment</strong>, our clients have shared their
      experiences with us.
    </p>
  </header>
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
    <div className="relative mt-2 flex w-11/12 flex-row overflow-hidden md:w-3/4">
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
  <div className="mx-1 flex w-80 flex-col items-center p-4 text-center duration-500 ease-in-out hover:bg-slate-50 hover:duration-100 xs:mx-3 xs:p-10 md:mx-5 md:w-96 lg:w-[30rem]">
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
    <p className="mb-12 mt-5 text-xs font-medium text-primary sm:mb-10 sm:text-sm lg:text-base">
      {props.testimonial.testimonial}
    </p>
    <Link
      target="_blank"
      rel="noopener noreferrer"
      href={props.testimonial.href}
      className="absolute bottom-6 w-40 bg-primary p-2 text-center text-sm text-white duration-500 ease-in-out hover:animate-pulse hover:brightness-110 sm:w-60 sm:text-base"
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

/**
 * Get the testimonials.
 */
const getTestimonials = (): any[] => [
  {
    name: "Louise Macdonald",
    testimonial:
      "I have worked with Marita Talbot many times and she is a fabulous Mortgage agent. She is amazing with her clients and really works hard to put the deal together with the best possible rates.",
    href: "https://g.co/kgs/VDaJQU",
    key: "d3y6vuhjn",
  },
  {
    name: "M Margaret",
    testimonial:
      "Fil from Dominion and Lending has helped make buying our first home as easy and stress free as possible. She explained everything clearly and diligently, and she also pays close attention to detail.",
    href: "https://g.co/kgs/GWespF",
    key: "emdlf8jeu",
  },
  {
    name: "Elizabeth Chen",
    testimonial:
      "We just bought our first home with the help of Dan and his team for the mortgage. It was a great experience working with them. Dan is very knowledgeable and knows what he does.",
    href: "https://g.co/kgs/yuZGvh",
    key: "fj3k4j3k4",
  },
  {
    name: "Jilu James",
    testimonial:
      "I would like to thank Paula for all her help to get best interest rate with a reputed bank. I highly recommend Dan and Paula for all your mortgage needs.",
    href: "https://g.co/kgs/a36Cf9",
    key: "hdiue83in",
  },
  {
    name: "Kelly Affeldt",
    testimonial:
      "Dan Simpson’s service is second to none! I have been sending my clients to Dan for their mortgage needs for over 10 years. Dan always has the time to assist his clients even on weekends, late evenings and even while he has been vacationing out of country!",
    href: "https://g.co/kgs/cs18se",
    key: "lpdkoeu3f",
  },
  {
    name: "Madison Lee",
    testimonial:
      "Dan Simpson and his team preform at an exceptional level. They work around the clock to provide the best service in the region. I highly recommend this team for a seamless mortgage experience.",
    href: "https://g.co/kgs/Laku65",
    key: "uidp9d7zg",
  },
  {
    name: "Keneisha Boreland",
    testimonial:
      "Thank you Richard for your great service. You were very patient and informative throughout the entire process. I appreciate your knowledge and the time you took to ensure we have the right  mortgage",
    href: "https://g.co/kgs/sK1KAf",
    key: "xlak267dj",
  },
  {
    name: "A&S Prestige Auto Sales",
    testimonial:
      "Richard was very professional and efficient to find the mortgages for us without any inconvenience, especially with the stress that the banks have at this moment for approving a mortgage. Thank you very much.",
    href: "https://g.co/kgs/mWVRuv",
    key: "lp04ahgdw",
  },
  {
    name: "Krystel Edwards",
    testimonial:
      "I couldn’t imagine a better team to work with. The speed, care, and dedication to their clients is unmatched. I refer all my friends and family here, and I know they are getting the absolute best service!!",
    href: "https://g.co/kgs/4ADCax",
    key: "qqrta18ji",
  },
  {
    name: "Collin Beaumont",
    testimonial:
      "The Dan Simpson Mortgage team was recommended to me by a realtor I have used for many years. His team and process was great and we could not be happier. ",
    href: "https://g.co/kgs/ZGqJ1A",
    key: "lp0z0ghju",
  },
  {
    name: "Priscila Lopes",
    testimonial:
      "We are so happy we chose Paula to help us with our mortgage! The whole process was super smooth; she understood our scenario and our expectations and helped us with the information we needed to buy our first home!",
    href: "https://g.co/kgs/4rJdYv",
    key: "09jjkfise",
  },
];
