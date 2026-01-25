// src/app/admin/admin.routes.ts
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout.component';
import { AdminFormComponent } from './admin-form/admin-form.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'form',
        component: AdminFormComponent,
      },
      {
        path: '',
        redirectTo: 'form',
        pathMatch: 'full',
      },
    ],
  },
];