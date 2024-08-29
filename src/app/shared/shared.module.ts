import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';



@NgModule({
  declarations: [
    Error404PageComponent,
    AccessDeniedComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    // ruta por defecto
    Error404PageComponent
  ]
})
export class SharedModule { }
