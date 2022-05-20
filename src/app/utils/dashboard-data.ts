import { BarOption, EchartsData } from '../services/type/echarts.type'

export const echartsSettings = {    // 全局配置
  xAxis: {
    axisLine: {     // 坐标轴
      color: "rgba(153, 153, 153, 1)"     // 坐标轴线颜色
    },
    axisLabel: {    // 坐标轴刻度相关设置
      color: "#333333",
      fontSize: 14,
      margin: 20,
    },
    nameTextStyle: {    // 坐标轴名称与轴线之间的距离
      padding: [54, 0, 0, 10],
    },
  },
  yAxis: {
    axisLabel: {    // 坐标轴刻度相关设置
      color: "#333333",
      fontSize: 14,
      margin: 20,
    },
    splitLine: {    // 坐标轴在 grid 区域中的分隔线设置
      type: "dashed",
      color: "rgba(153, 153, 153, 1)",
    },
  },
  series: {
    barWidth: 24,   //柱图宽度
    label: {
      show: false, // 是否显示数据
      position: "outside",
    },
  },
  grid: {     // 直角坐标系内绘图网格
    left: 90,
    right: 74,
    top: 65,
    bottom: 80,
  },
}

export const echartsData: EchartsData = {
  filterOpt: {
    dateValue: [],
    isShowData: false,
    isWeekly: false,
    isCompareLast: false,
  },
  wechatUsers: {
    barOption: {
      xAxisData: [],
      legend: {
        data: ["Follower", "Active User", "Stickiness Rate"],
      },
      series: {
        fir: [],
        sec: [],
        thi: [],
      },
      max: 0,
      isPage: {
        previous: false,
        next: false
      }
    },
    lineOption: {
      xAxisData: [],
      legend: {
        data: ["Follower", "Unfollower", "New Follower", "Net Increase"],
      },
      series: {
        fir: [],
        sec: [],
        thi: [],
        fou: [],
      },
      max: 0,
      isPage: {
        previous: false,
        next: false
      }
    },
  },
  operationData: {
    barOption: {
      legend: {
        data: ["Number", "NumberLastYear", "Success Rate", "RateLastYear"],
      },
      series: {
        fir: [],
        sec: [],
        thi: [],
        fou: []
      },
      max: 0,
      xAxisData: [],
      isPage: {
        previous: false,
        next: false
      }
    },
    bingOption: [
      {
        legend: {
          data: ["Follower", "Unfollower", "New Follower", "Net Increase"],
        },
        series: {
          data: [
            { value: 0, name: "Request Invoice" },
            { value: 0, name: "Track Shipment" },
            { value: 0, name: "Create a Shipment" },
            { value: 0, name: "Account Management" },
            { value: 0, name: "Fuel Surcharge" },
            { value: 0, name: "Open UPS Account" },
            { value: 0, name: "Other" },
          ],
        }
      },
      {
        legend: {
          data: ["Follower", "Unfollower", "New Follower", "Net Increase"],
        },
        series: {
          data: [
            { value: 0, name: "Request Invoice" },
            { value: 0, name: "Track Shipment" },
            { value: 0, name: "Create a Shipment" },
            { value: 0, name: "Account Management" },
            { value: 0, name: "Fuel Surcharge" },
            { value: 0, name: "Open UPS Account" },
            { value: 0, name: "Other" },
          ],
        }
      }
    ],
    barSimpleOption: {
      legend: {
        data: ["Number", "Other"],
      },
      series: {
        fir: [],
        sec: [],
      },
      max: 0,
      xAxisData: [],
      isPage: {
        previous: false,
        next: false
      }
    }
  },
  volumeRevenue: {
    barOption: [
      {
        legend: {
          data: ["Number", "LastYear", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
          thi: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Amount", "LastYear", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
          thi: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Number", "LastYear", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
          thi: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Number", "LastYear", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
          thi: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Number", "LastYear", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
          thi: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Amount", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Amount", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Number", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Amount", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Number", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
    ],
    bingOption: [
      {
        legend: {
          data: ["Account Holder", "UPS ID Holder"],
        },
        series: {
          data: [
            { value: 0, name: "Account Holder" },
            { value: 0, name: "UPS ID Holder" }
          ],
        }
      },
      {
        legend: {
          data: ["UPS Worldwide Express Plus", "UPS Worldwide Express Saver", "UPS Worldwide Express", "UPS Worldwide Expedited"],
        },
        series: {
          data: [
            { value: 0, name: "UPS Worldwide Express Plus" },
            { value: 0, name: "UPS Worldwide Express Save" },
            { value: 0, name: "UPS Worldwide Express" },
            { value: 0, name: "UPS Worldwide Expedited" }
          ],
        }
      },
      {
        legend: {
          data: ["P/P", "F/C"],
        },
        series: {
          data: [
            { value: 0, name: "P/P" },
            { value: 0, name: "F/C" }
          ],
        }
      },
      {
        legend: {
          data: ["Account Holder", "UPS ID Holder"],
        },
        series: {
          data: [
            { value: 0, name: "Account Holder" },
            { value: 0, name: "UPS ID Holder" }
          ],
        }
      },
      {
        legend: {
          data: ["UPS Worldwide Express Plus<sup>®</sup>", "UPS Worldwide Express Saver<sup>®</sup>", "UPS Worldwide Express<sup>®</sup>", "UPS Worldwide Expedited<sup>®</sup>"],
        },
        series: {
          data: [
            { value: 0, name: "UPS Worldwide Express Plus<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express Saver<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Expedited<sup>®</sup>" }
          ],
        }
      },
      {
        legend: {
          data: ["P/P", "F/C"],
        },
        series: {
          data: [
            { value: 0, name: "P/P" },
            { value: 0, name: "F/C" }
          ],
        }
      },
      // 对比去年
      {
        legend: {
          data: ["Account Holder", "UPS ID Holder"],
        },
        series: {
          data: [
            { value: 0, name: "Account Holder" },
            { value: 0, name: "UPS ID Holder" }
          ],
        }
      },
      {
        legend: {
          data: ["UPS Worldwide Express Plus<sup>®</sup>", "UPS Worldwide Express Saver<sup>®</sup>", "UPS Worldwide Express<sup>®</sup>", "UPS Worldwide Expedited<sup>®</sup>"],
        },
        series: {
          data: [
            { value: 0, name: "UPS Worldwide Express Plus<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express Saver<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Expedited<sup>®</sup>" }
          ],
        }
      },
      {
        legend: {
          data: ["Account Holder", "UPS ID Holder"],
        },
        series: {
          data: [
            { value: 0, name: "Account Holder" },
            { value: 0, name: "UPS ID Holder" }
          ],
        }
      },
      {
        legend: {
          data: ["UPS Worldwide Express Plus<sup>®</sup>", "UPS Worldwide Express Saver<sup>®</sup>", "UPS Worldwide Express<sup>®</sup>", "UPS Worldwide Expedited<sup>®</sup>"],
        },
        series: {
          data: [
            { value: 0, name: "UPS Worldwide Express Plus<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express Saver<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Expedited<sup>®</sup>" }
          ],
        }
      },
    ],
    duiOption: [
      {
        legend: {
          data: ["P/P", "F/C"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 10,
        xAxisData: []
      },
      {
        legend: {
          data: ["P/P", "F/C"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 10,
        xAxisData: []
      }
    ]
  },
  repeatAccountShipper: {
    barOption: {
      legend: {
        data: ["Number", "NumberLastYear", "Rate", "RateLastYear"],
      },
      series: {
        fir: [],
        sec: [],
        thi: [],
        fou: []
      },
      max: 0,
      xAxisData: [],
      isPage: {
        previous: false,
        next: false
      }
    },
  },
  customerSatisfaction: {
    barBackgroundOption: {
      legend: {
        data: ["Number", "Rate"],
      },
      series: {
        data: [120, 200, 150, 80, 70]
      },
      yAxis: {
        max: 500
      }
    },
    bingOption: {
      legend: {
        data: ["5 Star", "4 Star", "3 Star", "2 Star", "1 Star"],
      },
      series: {
        data: [
          { value: 135, name: "5 Star" },
          { value: 510, name: "4 Star" },
          { value: 434, name: "3 Star" },
          { value: 434, name: "2 Star" },
          { value: 434, name: "1 Star" }
        ],
      }
    },
  }
}

export const echartDataInit = {
  filterOpt: {
    dateValue: [],
    isShowData: false,
    isWeekly: false,
    isCompareLast: false,
  },
  wechatUsers: {
    barOption: {
      xAxisData: [],
      legend: {
        data: ["Follower", "Active User", "Stickiness Rate"],
      },
      series: {
        fir: [],
        sec: [],
        thi: [],
      },
      max: 0,
      isPage: {
        previous: false,
        next: false
      }
    },
    lineOption: {
      xAxisData: [],
      legend: {
        data: ["Follower", "Unfollower", "New Follower", "Net Increase"],
      },
      series: {
        fir: [],
        sec: [],
        thi: [],
        fou: [],
      },
      max: 0,
      isPage: {
        previous: false,
        next: false
      }
    },
  },
  operationData: {
    barOption: {
      legend: {
        data: ["Number", "NumberLastYear", "Success Rate", "RateLastYear"],
      },
      series: {
        fir: [],
        sec: [],
        thi: [],
        fou: []
      },
      max: 0,
      xAxisData: [],
      isPage: {
        previous: false,
        next: false
      }
    },
    bingOption: [
      {
        legend: {
          data: ["Follower", "Unfollower", "New Follower", "Net Increase"],
        },
        series: {
          data: [
            { value: 0, name: "Request Invoice" },
            { value: 0, name: "Track Shipment" },
            { value: 0, name: "Create a Shipment" },
            { value: 0, name: "Account Management" },
            { value: 0, name: "Fuel Surcharge" },
            { value: 0, name: "Open UPS Account" },
            { value: 0, name: "Other" },
          ],
        }
      },
      {
        legend: {
          data: ["Follower", "Unfollower", "New Follower", "Net Increase"],
        },
        series: {
          data: [
            { value: 0, name: "Request Invoice" },
            { value: 0, name: "Track Shipment" },
            { value: 0, name: "Create a Shipment" },
            { value: 0, name: "Account Management" },
            { value: 0, name: "Fuel Surcharge" },
            { value: 0, name: "Open UPS Account" },
            { value: 0, name: "Other" },
          ],
        }
      }
    ],
    barSimpleOption: {
      legend: {
        data: ["Number", "Other"],
      },
      series: {
        fir: [],
        sec: [],
      },
      max: 0,
      xAxisData: [],
      isPage: {
        previous: false,
        next: false
      }
    }
  },
  volumeRevenue: {
    barOption: [
      {
        legend: {
          data: ["Number", "LastYear", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
          thi: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Amount", "LastYear", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
          thi: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Number", "LastYear", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
          thi: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Number", "LastYear", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
          thi: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Number", "LastYear", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
          thi: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Amount", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Amount", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Number", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Amount", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
      {
        legend: {
          data: ["Number", "Rate"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 0,
        xAxisData: [],
        isPage: {
          previous: false,
          next: false
        }
      },
    ],
    bingOption: [
      {
        legend: {
          data: ["Account Holder", "UPS ID Holder"],
        },
        series: {
          data: [
            { value: 0, name: "Account Holder" },
            { value: 0, name: "UPS ID Holder" }
          ],
        }
      },
      {
        legend: {
          data: ["UPS Worldwide Express Plus<sup>®</sup>", "UPS Worldwide Express Saver<sup>®</sup>", "UPS Worldwide Express<sup>®</sup>", "UPS Worldwide Expedited<sup>®</sup>"],
        },
        series: {
          data: [
            { value: 0, name: "UPS Worldwide Express Plus<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express Saver<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Expedited<sup>®</sup>" }
          ],
        }
      },
      {
        legend: {
          data: ["P/P", "F/C"],
        },
        series: {
          data: [
            { value: 0, name: "P/P" },
            { value: 0, name: "F/C" }
          ],
        }
      },
      {
        legend: {
          data: ["Account Holder", "UPS ID Holder"],
        },
        series: {
          data: [
            { value: 0, name: "Account Holder" },
            { value: 0, name: "UPS ID Holder" }
          ],
        }
      },
      {
        legend: {
          data: ["UPS Worldwide Express Plus<sup>®</sup>", "UPS Worldwide Express Saver<sup>®</sup>", "UPS Worldwide Express<sup>®</sup>", "UPS Worldwide Expedited<sup>®</sup>"],
        },
        series: {
          data: [
            { value: 0, name: "UPS Worldwide Express Plus<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express Saver<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Expedited<sup>®</sup>" }
          ],
        }
      },
      {
        legend: {
          data: ["P/P", "F/C"],
        },
        series: {
          data: [
            { value: 0, name: "P/P" },
            { value: 0, name: "F/C" }
          ],
        }
      },
      // 对比去年
      {
        legend: {
          data: ["Account Holder", "UPS ID Holder"],
        },
        series: {
          data: [
            { value: 0, name: "Account Holder" },
            { value: 0, name: "UPS ID Holder" }
          ],
        }
      },
      {
        legend: {
          data: ["UPS Worldwide Express Plus<sup>®</sup>", "UPS Worldwide Express Saver<sup>®</sup>", "UPS Worldwide Express<sup>®</sup>", "UPS Worldwide Expedited<sup>®</sup>"],
        },
        series: {
          data: [
            { value: 0, name: "UPS Worldwide Express Plus<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express Saver<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Expedited<sup>®</sup>" }
          ],
        }
      },
      {
        legend: {
          data: ["Account Holder", "UPS ID Holder"],
        },
        series: {
          data: [
            { value: 0, name: "Account Holder" },
            { value: 0, name: "UPS ID Holder" }
          ],
        }
      },
      {
        legend: {
          data: ["UPS Worldwide Express Plus<sup>®</sup>", "UPS Worldwide Express Saver<sup>®</sup>", "UPS Worldwide Express<sup>®</sup>", "UPS Worldwide Expedited<sup>®</sup>"],
        },
        series: {
          data: [
            { value: 0, name: "UPS Worldwide Express Plus<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express Saver<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Express<sup>®</sup>" },
            { value: 0, name: "UPS Worldwide Expedited<sup>®</sup>" }
          ],
        }
      },
    ],
    duiOption: [
      {
        legend: {
          data: ["P/P", "F/C"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 10,
        xAxisData: []
      },
      {
        legend: {
          data: ["P/P", "F/C"],
        },
        series: {
          fir: [],
          sec: [],
        },
        max: 10,
        xAxisData: []
      }
    ]
  },
  repeatAccountShipper: {
    barOption: {
      legend: {
        data: ["Number", "NumberLastYear", "Rate", "RateLastYear"],
      },
      series: {
        fir: [],
        sec: [],
        thi: [],
        fou: []
      },
      max: 0,
      xAxisData: [],
      isPage: {
        previous: false,
        next: false
      }
    },
  },
  customerSatisfaction: {
    barBackgroundOption: {
      legend: {
        data: ["Number", "Rate"],
      },
      series: {
        data: [120, 200, 150, 80, 70]
      },
      yAxis: {
        max: 500
      }
    },
    bingOption: {
      legend: {
        data: ["5 Star", "4 Star", "3 Star", "2 Star", "1 Star"],
      },
      series: {
        data: [
          { value: 135, name: "5 Star" },
          { value: 510, name: "4 Star" },
          { value: 434, name: "3 Star" },
          { value: 434, name: "2 Star" },
          { value: 434, name: "1 Star" }
        ],
      }
    },
  }
}