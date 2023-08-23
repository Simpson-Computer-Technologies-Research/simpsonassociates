import { Dispatch, SetStateAction } from "react";

export type SetState<T> = Dispatch<SetStateAction<T>>;

export interface Agent {
  name: string;
  email: string;
  title: string;
  priority: boolean;
  team: string;
  hidden: boolean;
  lang: string;
  license: string;
  user_id: string;
  photo: string;
  region: {
    location: string;
    lat: number;
    lon: number;
  };
  permissions: string[];
}

export interface User {
  email: string | null;
  name: string | null;
  image: string | null;
  accessToken: string | null;
  permissions: string[];
}

export interface Event {
  event_id?: string | undefined;
  notify_agents?: boolean | undefined;
  title: string;
  description: string;
  date: number;
  posted_by: string;
  note: string;
}

export interface Rate {
  id: string;
  BankRate: string;
  OurRate: string;
  Terms: string;
  TermsFr: string;
  TermsPa: string;
  BankMonthly: string;
  OurMonthly: string;
  Savings: string;
  updated_at: string;
  TermsMonth: string;
}

export interface Region {
  location: string;
  lat: number;
  lon: number;
}

export interface AgentLocation {
  loading: boolean;
  active: boolean;
  lat: number;
  lon: number;
}

export interface Lender {
  logo: string;
  href: string;
}

export interface Testimonial {
  name: string;
  testimonial: string;
  href: string;
}
