import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar-item',
  templateUrl: './side-bar-item.component.html',
  styleUrls: ['./side-bar-item.component.scss']
})
export class SideBarItemComponent implements OnInit {
  item = {
    icon: 'test-icon',
    title: 'test',
    children: [
      // {
      //   icon: 'test-icon-child1',
      //   title: 'child1',
      // },
      // {
      //   icon: 'test-icon-child2',
      //   title: 'child1',
      // },
    ],
    hidden: false
  }
  pathList = [
    // {
    //   icon: 'user',
    //   title: 'dashboard',
    //   path: 'dashboard',
    //   children: [
    //     {
    //       icon: 'user',
    //       title: 'child1',
    //       path: 'dashboard',
    //     },
    //     // {
    //     //   icon: 'user',
    //     //   title: 'child2',
    //     //   path: 'child2',
    //     // },
    //   ],
    //   hidden: false
    // },
    {
      icon: 'user',
      title: 'WeChat KPI Dashboard',
      path: 'dashboard',
      hidden: false,
      children: [
        {
          path: 'dashboard/echarts',
          title: 'Dashboard'
        }
      ]
    },
    {
      icon: 'user',
      title: 'WeChat Payment',
      path: 'shipment/list',
      hidden: false
    },
    {
      icon: 'user',
      title: 'Customer Satisfaction',
      path: 'customer/list',
      hidden: false
    },
    {
      icon: 'user',
      title: 'MKT WeChat H5 Site',
      path: 'wechat-mgt',
      children: [
        {
          icon: 'user',
          title: 'Banner Management',
          path: 'banner',
        },
        {
          icon: 'user',
          title: 'Header Management',
          path: 'header',
        },
      ],
      hidden: false
    },
    {
      icon: 'user',
      title: 'Shipment',
      path: 'shipment',
      hidden: false
    },
  ]
  isCollapsed = false
  onlyOneChild = null
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  changePath(path: string) {
    console.log(path, '=================path');

    this.router.navigateByUrl(path)
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
