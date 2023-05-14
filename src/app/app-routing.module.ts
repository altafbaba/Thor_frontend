import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { x } from 'ng-heroicon';
import { LayoutComponent } from './layout/layout.component';

const routes: Route[] = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: '',
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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
