import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {
  message = 'The webmaster said that you can not enter this page...'
  constructor() { }

  ngOnInit(): void {
  }

}
