import { Routes } from '@angular/router';
import { IndexGeneratorComponent } from './components/index-generator/index-generator.component';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
  { path: '', component: IndexGeneratorComponent },
  { path: '**', redirectTo: '' },
];
