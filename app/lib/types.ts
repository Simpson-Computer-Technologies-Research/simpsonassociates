import React from "react";

export type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

export interface Agent {
  name: string;
  email: string;
  title: string;
  hidden: boolean;
  lang: string;
  license: string;
  user_id: string;
  photo: string;
  region: {
    location: string;
    lat: number;
    long: number;
  };
  permissions: string[];
}

export interface User {
  email: string | null | undefined;
  accessToken: string | null | undefined;
  name: string | null | undefined;
  image: string | null | undefined;
  permissions: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  attending: number;
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

export interface Location {
  location: string;
  lat: number;
  long: number;
}
