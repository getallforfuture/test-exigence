import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path:'', component: AppComponent }, // default route
  { path: 'user-description', loadChildren: () => import('./features/user-description/user-description.module').then(m => m.UserDescriptionModule) },
  { path: '**', redirectTo: 'user-description' }                 // wildcard redirect
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}