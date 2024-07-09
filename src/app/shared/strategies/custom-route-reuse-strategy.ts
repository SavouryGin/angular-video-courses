import {
  RouteReuseStrategy,
  ActivatedRouteSnapshot,
  DetachedRouteHandle,
} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  storedRoutes: { [key: string]: DetachedRouteHandle } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Cache only the CoursesListComponent route
    return (
      route.routeConfig?.path === '' || route.routeConfig?.path === 'courses'
    );
  }

  store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle | null
  ): void {
    if (route.routeConfig?.path && handle) {
      this.storedRoutes[route.routeConfig.path] = handle;
    }
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return !!route.routeConfig && !!this.storedRoutes[route.routeConfig.path!];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    if (!route.routeConfig) {
      return null;
    }
    return this.storedRoutes[route.routeConfig.path!] || null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    return future.routeConfig === curr.routeConfig;
  }
}
