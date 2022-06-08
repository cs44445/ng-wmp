import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-modal',
  templateUrl: './common-modal.component.html',
  styleUrls: ['./common-modal.component.scss']
})
export class CommonModalComponent implements OnInit {
  @Input() isVisible = true
  @Input() title = ''
  constructor() { }

  ngOnInit(): void {
  }

  handleCancel() {

  }

  handleOk() {

  }

}
