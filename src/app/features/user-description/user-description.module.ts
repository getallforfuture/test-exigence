import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDescriptionComponent } from './components/user-description/user-description.component';
import { UserDescriptionRoutingModule } from './user-description-routing.module';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';



@NgModule({
  declarations: [
    UserDescriptionComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    UserDescriptionRoutingModule,
    CommonModule
  ]
})
export class UserDescriptionModule { }
