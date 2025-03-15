import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [NavbarComponent, SidebarComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {
  title = 'task-manager';

  isSidebarVisible = false;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

}
