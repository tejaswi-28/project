import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isCollapsed = false;
  userName = localStorage.getItem('username');

  router = inject(Router);

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  logout() {
    localStorage.removeItem('myToken');
    localStorage.removeItem('username')
    this.router.navigateByUrl('login');
  }
}
