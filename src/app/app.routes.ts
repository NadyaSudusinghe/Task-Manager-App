import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TasksComponent } from './components/tasks/tasks.component';
// import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  // { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks', component: TasksComponent },
];
