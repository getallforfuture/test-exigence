import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDescriptionComponent } from './components/user-description/user-description.component';

const routes: Routes = [
  { path: ':id', component: UserDescriptionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDescriptionRoutingModule {}