import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";
import { Observable, of, tap } from "rxjs";

const checkAuthStatus = (): Observable<boolean> => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated => {
        if (!isAuthenticated)
          router.navigate(['./auth/login'])
      })
    )
}

export const canActivateGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot, // ruta actual
  state: RouterStateSnapshot
): boolean => {
  const router: Router = inject(Router);

  if (checkAuthStatus()) {
    const authService: AuthService = inject(AuthService);

    const userRoles = authService.getRoles();
    const expectedRoles = route.data['roles'];  // Acceso con corchetes

    const hasRole = userRoles.some((role) => expectedRoles.includes(role));
    if (!hasRole) {
      router.navigate(['/access-denied']);
      return false;
    }
    return true;
  }
  else {
    router.navigate(['./auth/login'])
    return false;
  }


}

export const canMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
): Observable<boolean> => {
  console.log('cantMatch');
  console.log({ route, segments });

  return checkAuthStatus();
}
