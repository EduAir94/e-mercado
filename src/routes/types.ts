import { NavigateFunction, Params } from 'react-router-dom';

interface RouteInterface {
  location: Location;
  navigate: NavigateFunction;
  params: Readonly<Params<string>>;
}

export type { RouteInterface };
