import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { x } from 'ng-heroicon';
import { AuthGuard } from './core/auth/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { AdminGuard } from './core/auth/guards/admin.guard';

const routes: Route[] = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path:'login',
    loadChildren:()=> import ('./modules/auth/auth.module').then((x)=> x.AuthModule)
  },
  
  
  {
    path: '',
    canActivate:[AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'vehicle',
        loadChildren: () =>
          import('./modules/vehicle/vehicle.module').then(
            (x) => x.VehicleModule
          ),
      },
      {
        path: 'maintenance',
        loadChildren: () =>
          import('./modules/maintenance/maintenance.module').then(
            (x) => x.MaintenanceModule
          ),
      },
      {
        path: 'driver',
        loadChildren: () =>
          import('./modules/driver/driver.module').then((x) => x.DriverModule),
      },
      
      {
        path: 'dashboard',
        
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (x) => x.DashboardModule
          ),
      },
      {
        path:'fuel',
        loadChildren:()=>
        import('./modules/fuel/fuel.module').then((x)=>x.FuelModule)

      },
      {path:'user',
      loadChildren:()=> import ('./modules/user/user.module').then((x)=> x.UserModule)

      },
      {
        path:'insurance',
        loadChildren:()=> import ('./modules/insurance/insurance.module').then((x)=>x.InsuranceModule)
      },
      {
        path:'reports',
        loadChildren:()=> import ('./modules/reports/reports.module').then((x)=>x.ReportsModule)

      }
     
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
