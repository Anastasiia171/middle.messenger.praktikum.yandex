import Block from "./Block";

interface ComponentConstructable<P extends Record<string, any> = any> {
  new (props: P): Block<P>;
}

const isEqual = (lhs: string, rhs: string): boolean => {
  return lhs === rhs;
};

const render = (query: string, block: Block) => {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`Root not found by selector "${query}"`);
  }

  root.innerHTML = "";

  root.append(block.getContent()!);

  return root;
};

class Route {
  private view: Block | null = null;

  constructor(
    private pathname: string,
    private readonly componentClass: ComponentConstructable,
    private readonly query: string
  ) {}

  leave() {
    this.view = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.view) {
      this.view = new this.componentClass({});

      render(this.query, this.view);
      return;
    }
  }
}
class Router {
  private static __instance: Router;
  public routes: Route[] = [];
  private _currentRoute: Route | null = null;
  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  get currentRoute(): string | null {
    return window.location.pathname;
  }

  public use = (pathname: string, block: ComponentConstructable) => {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);

    return this;
  };

  public start = () => {
    window.onpopstate = (() => {
      this._onRoute(window.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  };

  private _onRoute = (pathname: string) => {
    let route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  };

  public go = (pathname: string) => {
    this.history.pushState({}, "", pathname);

    this._onRoute(pathname);
  };

  public back = () => {
    this.history.back();
  };

  public forward = () => {
    this.history.forward();
  };

  private getRoute = (pathname: string) => {
    const route = this.routes.find(route => route.match(pathname));
    if (route) return route;
    else {
      window.location.pathname = "404";
      return this.routes.find(el => el.match("404"));
    }
  };
}
export default new Router("#app");
