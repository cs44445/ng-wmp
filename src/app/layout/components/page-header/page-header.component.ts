import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {
  @Input() title = ''
  opened = true
  constructor(private route: ActivatedRoute) {
    console.log(this.route.url, 'route');

  }

  ngOnInit(): void {
  }

  handleClickOutside() {
    console.log('dddd');
    this.opened = !this.opened
  }

}
