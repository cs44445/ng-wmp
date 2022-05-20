import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modular-title',
  templateUrl: './modular-title.component.html',
  styleUrls: ['./modular-title.component.scss']
})
export class ModularTitleComponent implements OnInit {
  @Input() title = ''
  constructor() { }

  ngOnInit(): void {
  }

}
