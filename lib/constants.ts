import { Agent, Lender, Testimonial } from "./types";

export const ONE_DAY_IN_MILLISECONDS: number = 86400000;
export const DEFAULT_CONTACT_EMAIL: string = "contact@dansimpson.ca";
export const DEFAULT_CONTACT_IMAGES: string[] = [
  "/images/agents/dave_headshot.png",
  "/images/agents/marina_headshot.png",
  "/images/agents/babar_headshot.png",
  "/images/agents/fil_headshot.png",
  "/images/agents/celeste_headshot.png",
  // "/images/agents/marita_headshot.png",
];

export const NAVBAR_BUTTON_SECTION_IDS: string[] = [
  "home",
  "rates",
  "services",
  "agents",
  "contact",
];

export const LEADERSHIP_TEAM = [
  {
    name: "Dan Simpson",
    email: "dan@dansimpson.ca",
    photo: "/images/agents/dan_headshot.png",
    title: "Founder",
    location: "",
  },
  {
    name: "Patrick Tremblay",
    email: "patrick.tremblay@dominionlending.ca",
    photo: "/images/agents/patrick_headshot.png",
    title: "Vice President Residential Lending",
    location: "Ontario",
  },
  {
    name: "Dave Mota",
    email: "dave@dansimpson.ca",
    photo: "/images/agents/dave_headshot.png",
    title: "Vice President Residential Lending",
    location: "Waterloo Region",
  },
];

export const SUPPORT_TEAM: Agent[] = [
  {
    name: "Fil Vieira-Lee",
    email: "fil@dansimpson.ca",
    photo: "/images/agents/fil_headshot.png",
    title: "Client Care Coordinator",
    lang: "English, Portuguese",
  } as Agent,
  {
    name: "Celeste Bernard",
    email: "celeste@dansimpson.ca",
    photo: "/images/agents/celeste_headshot.png",
    title: "Client Care Coordinator",
    lang: "English",
  } as Agent,
  {
    name: "Paula Freitas",
    email: "paula@dansimpson.ca",
    photo: "/images/agents/paulafreitas_headshot.png",
    title: "Senior Underwriter",
    lang: "English, Portuguese",
  } as Agent,
  {
    name: "Jill Melanson",
    email: "jillmelanson@dominionlending.ca",
    photo: "/images/agents/jill_headshot.png",
    title: "Senior Underwriter",
    lang: "English",
  } as Agent,
  {
    name: "Debbie Kitchen",
    email: "debbiekitchen@dansimpson.ca",
    photo: "/images/agents/debbie_headshot.png",
    title: "Onboarding Manager",
    lang: "English",
  } as Agent,
  {
    name: "Ryan Roth",
    email: "ryan@ryanrothmortgages.ca",
    photo: "/images/agents/ryanroth_headshot.png",
    title: "Onboarding Manager",
    lang: "English",
  } as Agent,
];

export const LENDERS: Lender[] = [
  {
    logo: "/images/lenders/td.png",
    href: "https://www.td.com/",
  },
  {
    logo: "/images/lenders/scotiabank.png",
    href: "https://www.scotiabank.com/",
  },
  {
    logo: "/images/lenders/hsbc.png",
    href: "https://www.hsbc.com/",
  },
  {
    logo: "/images/lenders/mcap.png",
    href: "https://www.mcap.com/",
  },
  {
    logo: "/images/lenders/yncu.png",
    href: "https://www.yncu.com/",
  },
  {
    logo: "/images/lenders/meridian.png",
    href: "https://www.meridiancu.ca/",
  },
  {
    logo: "/images/lenders/wfcu.png",
    href: "https://www.wfcu.ca/",
  },
  {
    logo: "/images/lenders/westboro.png",
    href: "https://westboromic.com/",
  },
  {
    logo: "/images/lenders/firstnational.png",
    href: "https://www.firstnational.ca/",
  },
  {
    logo: "/images/lenders/wealthone.png",
    href: "https://www.wealthonebankofcanada.com/",
  },
  {
    logo: "/images/lenders/b2b.png",
    href: "https://b2bbank.com/",
  },
  {
    href: "https://www.homeequitybank.ca/",
    logo: "/images/lenders/homeequity.png",
  },
  {
    href: "https://www.rmgmortgages.ca/",
    logo: "/images/lenders/rmg.png",
  },
  {
    href: "https://www.desjardins.com/",
    logo: "/images/lenders/desjardins.png",
  },
  {
    href: "https://www.icsavings.ca/",
    logo: "/images/lenders/icsavings.png",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Louise Macdonald",
    testimonial:
      "I have worked with Marita Talbot many times and she is a fabulous Mortgage agent. She is amazing with her clients and really works hard to put the deal together with the best possible rates.",
    href: "https://g.co/kgs/VDaJQU",
  },
  {
    name: "M Margaret",
    testimonial:
      "Fil from Dominion and Lending has helped make buying our first home as easy and stress free as possible. She explained everything clearly and diligently, and she also pays close attention to detail.",
    href: "https://g.co/kgs/GWespF",
  },
  {
    name: "Elizabeth Chen",
    testimonial:
      "We just bought our first home with the help of Dan and his team for the mortgage. It was a great experience working with them. Dan is very knowledgeable and knows what he does.",
    href: "https://g.co/kgs/yuZGvh",
  },
  {
    name: "Jilu James",
    testimonial:
      "I would like to thank Paula for all her help to get best interest rate with a reputed bank. I highly recommend Dan and Paula for all your mortgage needs.",
    href: "https://g.co/kgs/a36Cf9",
  },
  {
    name: "Kelly Affeldt",
    testimonial:
      "Dan Simpson’s service is second to none! I have been sending my clients to Dan for their mortgage needs for over 10 years. Dan always has the time to assist his clients even on weekends, late evenings and even while he has been vacationing out of country!",
    href: "https://g.co/kgs/cs18se",
  },
  {
    name: "Madison Lee",
    testimonial:
      "Dan Simpson and his team preform at an exceptional level. They work around the clock to provide the best service in the region. I highly recommend this team for a seamless mortgage experience.",
    href: "https://g.co/kgs/Laku65",
  },
  {
    name: "Keneisha Boreland",
    testimonial:
      "Thank you Richard for your great service. You were very patient and informative throughout the entire process. I appreciate your knowledge and the time you took to ensure we have the right  mortgage",
    href: "https://g.co/kgs/sK1KAf",
  },
  {
    name: "A&S Prestige Auto Sales",
    testimonial:
      "Richard was very professional and efficient to find the mortgages for us without any inconvenience, especially with the stress that the banks have at this moment for approving a mortgage. Thank you very much.",
    href: "https://g.co/kgs/mWVRuv",
  },
  {
    name: "Krystel Edwards",
    testimonial:
      "I couldn’t imagine a better team to work with. The speed, care, and dedication to their clients is unmatched. I refer all my friends and family here, and I know they are getting the absolute best service!!",
    href: "https://g.co/kgs/4ADCax",
  },
  {
    name: "Collin Beaumont",
    testimonial:
      "The Dan Simpson Mortgage team was recommended to me by a realtor I have used for many years. His team and process was great and we could not be happier. ",
    href: "https://g.co/kgs/ZGqJ1A",
  },
  {
    name: "Priscila Lopes",
    testimonial:
      "We are so happy we chose Paula to help us with our mortgage! The whole process was super smooth; she understood our scenario and our expectations and helped us with the information we needed to buy our first home!",
    href: "https://g.co/kgs/4rJdYv",
  },
];
