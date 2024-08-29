import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateGuard, canMatchGuard } from './auth/guards/auth.guard';
import { AccessDeniedComponent } from './shared/pages/access-denied/access-denied.component';
import { canActivateGuardPublic } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate:[canActivateGuardPublic]
  },
  {
    path: 'heroes',
    loadChildren: () => import('./heroes/heroes.module').then(m => m.HeroesModule),
    canMatch: [canMatchGuard],  // Decide si esta ruta debería siquiera ser considerada.
    canActivate: [canActivateGuard],  // Decide si el usuario puede activar la ruta y ver su contenido.
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_JUAN']
    }

  }, {
    path: '404',
    component: Error404PageComponent
  }, {
    path: 'access-denied',
    component: AccessDeniedComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full' // que sea exactamente vacio
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


}
