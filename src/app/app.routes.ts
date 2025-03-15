import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { authGuard } from './guard/auth.guard';
// import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { 
        path: 'dashboard', 
        component: DashboardComponent 
      },
      // { path: 'dashboard', component: DashboardComponent },
      { path: 'tasks', component: TasksComponent },
    ]
  },

];
