import { Agent, Rate } from "./types";

export class AgentsCache {
  cache: Agent[] = [];

  constructor() {
    console.log("Intialized agents cache");
  }

  public static readonly globalize = () => {
    const global: any = globalThis as any;
    if (!global.agents) global.agents = new AgentsCache();
  };

  public static readonly isCached = () => {
    const global: any = globalThis as any;
    return global.agents.cache.length > 0;
  };

  public static readonly get = () => {
    const global: any = globalThis as any;
    return global.agents.cache;
  };

  public static readonly set = (agents: Agent[]) => {
    const global: any = globalThis as any;
    global.agents.cache = agents;
  };

  public static readonly update = (agent: Agent) => {
    const global: any = globalThis as any;
    const index = global.agents.cache.findIndex(
      (a: Agent) => a.user_id === agent.user_id,
    );
    if (index === -1) return;
    global.agents.cache[index] = agent;
  };

  public static readonly add = (agent: Agent) => {
    const global: any = globalThis as any;
    global.agents.cache.push(agent);
  };

  public static readonly delete = (index: number) => {
    const global: any = globalThis as any;
    global.agents.cache.splice(index, 1);
  };
}

export class RatesCache {
  cache: Rate[] = [];

  constructor() {
    console.log("Intialized rates cache");
  }

  public static readonly globalize = () => {
    const global: any = globalThis as any;
    if (!global.rates) global.rates = new RatesCache();
  };

  public static readonly isCached = () => {
    const global: any = globalThis as any;
    return global.rates.cache.length > 0;
  };

  public static readonly get = () => {
    const global: any = globalThis as any;
    return global.rates.cache;
  };

  public static readonly set = (rates: Rate[]) => {
    const global: any = globalThis as any;
    global.rates.cache = rates;
  };

  public static readonly update = (index: number, data: Rate) => {
    const global: any = globalThis as any;
    global.rates.cache[index] = data;
  };

  public static readonly add = (rate: Rate) => {
    const global: any = globalThis as any;
    global.rates.cache.push(rate);
  };

  public static readonly delete = (index: number) => {
    const global: any = globalThis as any;
    global.rates.cache.splice(index, 1);
  };
}

RatesCache.globalize();
AgentsCache.globalize();
