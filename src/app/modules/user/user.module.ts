import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const uRoutes:Route[]=[
  
  {path:'',
  component:UserComponent
  
},
{
  path:'uForm',
  component:UserFormComponent
}
]

@NgModule({
  declarations: [
    UserComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,SharedModule,ReactiveFormsModule,FormsModule,RouterModule.forChild(uRoutes)
  ]
})
export class UserModule { }
