
import { AuthService } from './../services/auth.service';
import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router";
import { map, Observable, of, tap } from 'rxjs';

export const canActivateGuardPublic: CanActivateFn = (): boolean | Observable<boolean> => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.checkAuthentication()
    .pipe(
      tap(isAuthenticated => console.log('Auth: ', isAuthenticated)),
      tap(isAuthenticated =>{
        if(isAuthenticated){
          router.navigate(['/heroes']);
        }
      }),
      // si es false, no esta hizo login, pero el false
      // te saca del view, devuelves un true para que se vea.
      // si es true, lo manda a heroes e ignora el resto
      map(isAuthenticated => !isAuthenticated)
    )
}
