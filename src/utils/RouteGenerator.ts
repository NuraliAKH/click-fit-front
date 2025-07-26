type RouteParams = {
  [key: string]: string | number;
};

export default class RouteGenerator<TParams extends RouteParams> {
  private routeTemplate: string;

  private paramNames: (keyof TParams)[];

  private static definedRoutes = new Set<string>();

  constructor(routeTemplate: string) {
    this.routeTemplate = routeTemplate;
    this.paramNames = RouteGenerator.extractParamNames(routeTemplate) as (keyof TParams)[];
    RouteGenerator.checkAndAddRoute(routeTemplate);
  }

  private static checkAndAddRoute(route: string): void {
    if (RouteGenerator.definedRoutes.has(route)) {
      throw new Error(`Route repeated: ${route}`);
    }
    RouteGenerator.definedRoutes.add(route);
  }

  get route(): string {
    return this.routeTemplate;
  }

  private static extractParamNames(template: string): string[] {
    const paramNames: string[] = [];
    const regex = /:([^/]+)/g;
    let match: RegExpExecArray | null;

    do {
      match = regex.exec(template);
      if (match && match[1]) {
        paramNames.push(match[1]);
      }
    } while (match !== null);

    return paramNames;
  }

  public getParamNames(): (keyof TParams)[] {
    return this.paramNames;
  }

  public toLink(params: TParams): string {
    const missingParams = this.paramNames.filter(param => !Object.prototype.hasOwnProperty.call(params, param));
    if (missingParams.length > 0) {
      throw new Error(`Missing parameters: ${missingParams.join(", ")} for route ${this.routeTemplate}`);
    }

    return this.routeTemplate.replace(/:([^/]+)/g, (_, paramName) => {
      return String(params[paramName as keyof TParams]);
    });
  }

  public link(params?: TParams): string {
    return this.toLink(params || ({} as TParams));
  }
}
