import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageService } from 'src/app/services/business/local-storage.service';
import { StaffInfo } from 'src/app/services/type/user.type';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  opened = true
  title = 'Web Management Portal'
  @Input() visible = false
  @Output() closed = new EventEmitter<boolean>()
  @Output() changed = new EventEmitter<boolean>()
  // @Output() changeVisible = new EventEmitter<boolean>()
  staffInfo?: StaffInfo
  constructor(private ls: LocalStorageService) { }

  ngOnInit(): void {
    this.staffInfo = this.ls.get('staffInfo', '')
    console.log(this.staffInfo, 'ssssssssssss');
  }

  changeShow(event: boolean) {
    console.log(event);
    // this.changed.emit(event)
    // this.changeVisible.emit(event)
  }

  closePoper() {
    this.closed.emit(this.visible)
  }

}
