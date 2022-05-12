import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-auth-page',
  templateUrl: './not-auth-page.component.html',
  styleUrls: ['./not-auth-page.component.scss']
})
export class NotAuthPageComponent implements OnInit {
  errGif = '../../../assets/401_images/401.gif' + '?' + +new Date()
  ewizardClap = 'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646'
  dialogVisible = false
  constructor() { }

  ngOnInit(): void {
  }

  showModal(event: MouseEvent) {
    event.preventDefault()
    this.dialogVisible = true
  }
}
