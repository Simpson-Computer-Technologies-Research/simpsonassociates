export class AgentsCache {
  cache: {
    name: string;
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
}
