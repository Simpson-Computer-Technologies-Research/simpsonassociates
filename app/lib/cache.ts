export class AgentsCache {
  cache: {
    name: string;
    user_id: string;
    email: string;
    title: string;
    photo: string;
    lang: string;
    level: string;
    permissions: string[];
    license: string;
    region: {
      location: string;
      lat: string;
      long: string;
    };
  }[];

  constructor() {
    this.cache = [];
  }

  isCached() {
    return this.cache.length > 0;
  }

  get() {
    return this.cache;
  }

  update(agents: any[]) {
    this.cache = agents;
  }

  update_agent(agent_id: any, data: any) {
    const index = this.cache.findIndex((agent) => agent.user_id === agent_id);
    this.cache[index] = data;
  }

  add_agent(agent: any) {
    this.cache.push(agent);
  }

  delete_agent(agent_id: any) {
    const index = this.cache.findIndex((agent) => agent.user_id === agent_id);
    this.cache.splice(index, 1);
  }
}

export class RatesCache {
  cache: {
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
  }[];

  constructor() {
    this.cache = [];
  }

  isCached() {
    return this.cache.length > 0;
  }

  get() {
    return this.cache;
  }

  set(rates: any[]) {
    this.cache = rates;
  }

  update(index: number, data: any) {
    this.cache[index] = data;
  }

  add(rate: any) {
    this.cache.push(rate);
  }

  delete(index: number) {
    this.cache.splice(index, 1);
  }
}
