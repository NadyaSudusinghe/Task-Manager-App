import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-navbar',
  standalone:true,
  imports: [MatToolbarModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Output() sidebarToggle = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggle.emit();
  }
}
