import { arraysEqual } from "ng-zorro-antd/core/util"
import { WeekAxisParams } from "../services/type/dashboard-common.type"

const months = {
	'Jan': '01',
	'Feb': '02',
	'Mar': '03',
	'Apr': '04',
	'May': '05',
	'Jun': '06',
	'Jul': '07',
	'Aug': '08',
	'Sep': '09',
	'Oct': '10',
	'Nov': '11',
	'Dec': '12'
}

// 解决报错：元素隐式具有 "any" 类型，因为类型为 "string" 的表达式不能用于索引类型
export function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object {
	return key in object;
}

// dashboard 周数据的时候修改x轴的显示格式 'WE1009 2020'
export function weekAxis(args: WeekAxisParams) {
	args.arr = args.arr.map(i => {
		const item = i.split(" ") || []
		const item0 = item[0] || ''
		const item1 = item[1] || ''
		const item2 = item[2] || ''
		if (isValidKey(item0, months)) {
			if (item0 && months[item0] && args.isweek) {
				return args.isCompareLast ? 'WE ' + months[item0] + item1 : 'WE' + months[item0] + item1 + ' ' + item2
			}
			if (item0 && months[item0] && args.isCompareLast) {
				return item0
			}
		}
		return i
	})
	return args.arr
}

