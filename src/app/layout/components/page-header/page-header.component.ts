import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() title = 'WeChat KPI Dashboard'
  opened = true
  constructor() { }

  ngOnInit(): void {
  }

  handleClickOutside() {
    console.log('dddd');
    this.opened = !this.opened
  }

}
