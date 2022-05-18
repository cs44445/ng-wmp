import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false
  constructor() { }

  restStyle = {
    'flex': ' 0 0 250px',
    'min-width': '250px',
    'max-width': '250px',
  }

  ngOnInit(): void {
  }

  logout() {

  }

}
