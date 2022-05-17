import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { Event } from '@angular/router';

@Component({
  selector: 'app-not-auth-page',
  templateUrl: './not-auth-page.component.html',
  styleUrls: ['./not-auth-page.component.scss']
})
export class NotAuthPageComponent implements OnInit {
  errGif = '../../../assets/401_images/401.gif' + '?' + +new Date()
  ewizardClap = 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646'
  @Input() dialogVisible = false
  @Output() show = new EventEmitter<boolean>()
  constructor() { }

  ngOnInit(): void {
  }

  showModal(event: Event) {
    event.preventDefault()
    this.dialogVisible = true
    this.show.emit(this.dialogVisible)
  }
}
