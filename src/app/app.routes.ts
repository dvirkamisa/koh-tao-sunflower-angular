import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { JoinUsComponent } from './pages/join-us/join-us.component';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { SubmissionsComponent } from './pages/admin/submissions.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'join-us', component: JoinUsComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'submissions', component: SubmissionsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
