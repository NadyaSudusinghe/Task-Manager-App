import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [MatToolbarModule, CommonModule, MatIconModule, MatButtonModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Output() sidebarToggle = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  router = inject(Router);

  onLogOff() {
    localStorage.removeItem("user");
    this.router.navigateByUrl("login");
  }
}
