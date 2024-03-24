import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserFormComponent } from './user-form/user-form.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createUserResolver, editUserResolver } from 'src/app/core/user/user.resolver';
import { AdminGuard } from 'src/app/core/auth/guards/admin.guard';

const uRoutes:Route[]=[
  
  {path:'',
 
  component:UserComponent
  
},
{
  path:'uForm',
 
  resolve:[createUserResolver],
  component:UserFormComponent
},
{
  path:':id',
 
  resolve:[editUserResolver],
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
