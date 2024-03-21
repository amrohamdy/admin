import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  viewList: boolean = false;
  viewLangs: boolean = false;
  userName = localStorage.getItem('name');

  constructor (private router: Router) {

  }
  toggleList() {
    this.viewList = !this.viewList;
    this.viewLangs = false;
  }
  showLangs() {
    this.viewLangs = !this.viewLangs;
    this.viewList = false;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
