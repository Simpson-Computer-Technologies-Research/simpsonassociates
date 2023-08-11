"use client";

// Blue layer over the office meeting images
// Have a "Join us" area here
export default function About(): JSX.Element {
  return (
    <section
      id="about"
      className="group relative flex w-full flex-col items-center justify-center p-10 py-16 pt-20 text-center bg-slate-50"
    >
      <Header />
    </section>
  );
}

/**
 * Header Component
 * @returns JSX.Element
 */
const Header = (): JSX.Element => (
  <div className="flex flex-col items-center justify-center">
    <h2 className="text-6xl font-extrabold text-primary lg:text-7xl">
      About Us
    </h2>
    <span className="mx-10 mb-6 mt-5 block h-1 w-2/5 rounded-full bg-secondary xs:w-1/4 sm:mb-10 sm:mt-7 lg:w-72"></span>
    <p className="mb-4 w-3/4 text-base text-primary sm:w-1/2">
      About Us paragraph
    </p>
  </div>
);
