import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { PaginationConfig } from 'src/app/services/type/common.type';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() config: PaginationConfig = {
    total: 50,
    page_size: 50,
    page_index: 1
  }
  @Output() currentChange = new EventEmitter<number>()
  jump_to_page = 1
  totalPage = 1

  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    const { total } = changes['config'].currentValue
    this.totalPage = Math.ceil(total / this.config.page_size)
  }

  jump(targetPage: number) {
    this.jump_to_page = targetPage
    this.currentChange.emit(targetPage)
  }

  jumpOnePage() {
    this.config.page_index--;
    if (this.config.page_index < 1) {
      return this.config.page_index = 1
    }
    this.jump(this.config.page_index)
  }

  goOnePage() {
    this.config.page_index++;
    if (this.config.page_index > this.totalPage) {
      return this.config.page_index = this.totalPage
    }
    this.jump(this.config.page_index)
  }

}
