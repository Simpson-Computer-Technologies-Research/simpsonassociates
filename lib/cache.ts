import { Agent, Rate } from "./types";

export class AgentsCache {
  cache: Agent[];

  constructor() {
    this.cache = [];
  }

  isCached() {
    return this.cache.length > 0;
  }

  get() {
    return this.cache;
  }

  update(agents: Agent[]) {
    this.cache = agents;
  }

  update_agent(user_id: string, data: Agent) {
    const index = this.cache.findIndex((agent) => agent.user_id === user_id);
    this.cache[index] = data;
  }

  add_agent(agent: Agent) {
    this.cache.push(agent);
  }

  delete_agent(user_id: string) {
    const index = this.cache.findIndex((agent) => agent.user_id === user_id);
    this.cache.splice(index, 1);
  }
}

export class RatesCache {
  cache: Rate[];

  constructor() {
    this.cache = [];
  }

  isCached() {
    return this.cache.length > 0;
  }

  get() {
    return this.cache;
  }

  set(rates: Rate[]) {
    this.cache = rates;
  }

  update(index: number, data: Rate) {
    this.cache[index] = data;
  }

  add(rate: Rate) {
    this.cache.push(rate);
  }

  delete(index: number) {
    this.cache.splice(index, 1);
  }
}
