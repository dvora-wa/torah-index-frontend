import { Routes } from '@angular/router';
import { IndexGeneratorComponent } from './components/index-generator/index-generator.component';

export const routes: Routes = [
  { path: '', component: IndexGeneratorComponent },
  { path: '**', redirectTo: '' },
];
