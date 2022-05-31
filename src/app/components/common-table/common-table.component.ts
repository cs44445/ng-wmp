import { Component, OnInit } from '@angular/core';
interface ItemData {
  id: number;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-common-table',
  templateUrl: './common-table.component.html',
  styleUrls: ['./common-table.component.scss']
})
export class CommonTableComponent implements OnInit {

  constructor() { }

  headHeight = 167
  selectedTrackingNos = []
  date = null
  listOfData: ItemData[] = []
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();
  fixedColumn = false

  ngOnInit(): void {
    const data = [];
    // for (let i = 0; i < 100; i++) {
    //   data.push({
    //     name: `Edward King ${i}`,
    //     age: 32,
    //     address: `London, Park Lane no. ${i}`
    //   });
    // }
    // this.listOfData = data;
    this.listOfData = new Array(200).fill(0).map((_, index) => ({
      id: index,
      name: `Edward King ${index}`,
      age: 32,
      address: `London, Park Lane no. ${index}`
    }))
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }


}
