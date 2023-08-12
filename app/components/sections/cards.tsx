"use client";

/**
 * Cards Component
 * @returns JSX.Element
 */
export default function Cards(): JSX.Element {
  return (
    <div
      id="cards"
      className="relative z-0 flex flex-col items-center justify-center bg-slate-50"
    >
      <div className="grid grid-cols-1 px-10 py-8 md:grid-cols-2 md:px-14 md:py-16 lg:grid-cols-3">
        <Card
          className="my-5 w-full rounded-l-xl rounded-r-xl md:rounded-r-none md:border-r-2 md:border-r-slate-100"
          title="Calculators"
          description="Our Interactive Mortgage Calculators will allow you to explore 
            your Mortgage options to make the right home financing decision."
          button={{
            href: "https://calculators.dominionlending.ca/",
            text: "Start Calculating",
          }}
        />
        <Card
          className="my-5 w-full rounded-l-xl rounded-r-xl md:rounded-l-none lg:rounded-r-none lg:border-r-2 lg:border-r-slate-100"
          title="Apply"
          description="Applying for a mortgage couldn’t be easier. 
            Just complete our secure application and we will be in touch shortly."
          button={{
            href: "/",
            text: "Apply Now",
          }}
        />
        <Card
          className="my-5 w-full rounded-l-xl rounded-r-xl md:w-[200%] md:px-40 lg:w-full lg:rounded-l-none"
          title="Rates"
          description="Our rates are always competitive and we pride ourselves on making 
            sure that you get the best possible rate available to you."
          button={{
            href: "/",
            text: "See Rates",
          }}
        />
      </div>
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
  };
  className: string;
}

/**
 * Card Component
 * @param props
 */
const Card = (props: CardProps): JSX.Element => (
  <section
    className={`group relative z-10 bg-white p-10 py-10 sm:py-16 lg:p-12 ${props.className}`}
  >
    <div className="flex flex-col items-center justify-center text-center duration-500 ease-in-out group-hover:-translate-y-3">
      <h1 className="mb-5 text-4xl font-extrabold text-primary sm:mb-6">
        {props.title}
      </h1>
      <span className="mb-6 h-[3px] w-28 rounded-full bg-secondary duration-500 ease-in-out group-hover:w-40 sm:mb-7"></span>
      <p className="text-sm text-primary sm:text-base">{props.description}</p>
      <a
        href={props.button.href}
        rel="noreferrer"
        target="_blank"
        className="mt-7 rounded-full bg-secondary px-8 py-3 text-base font-medium tracking-wider text-white outline-2 outline-tertiary duration-500 ease-in-out hover:animate-pulse hover:px-10 hover:brightness-[1.05] md:outline-none"
      >
        {props.button.text}
      </a>
    </div>
  </section>
);
