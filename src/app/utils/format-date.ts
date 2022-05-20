
/*
  * 对Date的扩展，将 Date 转化为指定格式的String
  * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符、毫秒(S) 1-3个占位符
  * 年(y)可以用 1-4 个占位符
  * 例子：
  * (new Date()).format("yyyy-MM-dd hh:mm:ss.SSS") ==> 2006-07-02 08:09:04.423
  * (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.4(毫秒从高位-低位依次取)
*/
export function format(date: any, fmt: string) {
  let formated = fmt
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S+': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(formated)) formated = formated.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length))
  Object.keys(o).forEach((key) => {
    if (new RegExp(`(${key})`).test(formated)) {
      if (key === 'S+') {
        const start = `00${o[key]}`.length - 3
        formated = formated.replace(RegExp.$1, `00${o[key]}`.substr(start, RegExp.$1.length))
      }
      formated = formated.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[key]) : ((`00${o[key]}`).substr((`${o[key]}`).length)))
    }
  })
  return formated
}

/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time: any, cFormat: string) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @description: 计算过去多少天的格式化日期
 * @param {Number} 过去的天数
 * @return {String} 返回的日期格式
 */
export function pastServalDays(pastDays = 3, fmt = 'yyyy-MM-dd') {
  const dayTimeStamp = 24 * 60 * 60 * 1000
  const nowTimeStamp = new Date().getTime()

  const pastDaysTimeStamp = nowTimeStamp - pastDays * dayTimeStamp

  return format(new Date(pastDaysTimeStamp), fmt)
}

/**
 * @description: 计算过去指定月的格式化日期
 * @param {Number} 过去的月
 * @return {String} 返回的日期格式
 */
export function pastServalMonths(pastMonths = 6, fmt = 'yyyy-MM-dd') {
  const currentDate = new Date()

  let currentDays = currentDate.getDate()
  let currentMonth = currentDate.getMonth()
  let currentYear = currentDate.getFullYear()

  currentYear = (currentMonth - pastMonths < 0) ? currentYear - 1 : currentYear

  currentMonth = (currentMonth - pastMonths + 12) % 12

  const tempDate = new Date(currentYear, currentMonth + 1, 0)

  currentDays = currentDays > tempDate.getDate() ? tempDate.getDate() : currentDays

  currentDate.setDate(currentDays)
  currentDate.setMonth(currentMonth)
  currentDate.setFullYear(currentYear)

  return format(currentDate, fmt)
}

// 格式化日期格式为 xxxx-xx-xx
function getFullDate(targetDate) {
  var D, y, m, d;
  if (targetDate) {
    D = new Date(targetDate);
    y = D.getFullYear();
    m = D.getMonth() + 1;
    d = D.getDate();
  } else {
    y = fullYear;
    m = month;
    d = date;
  }
  m = m > 9 ? m : '0' + m;
  d = d > 9 ? d : '0' + d;
  return y + '-' + m + '-' + d;
};

// export function getStartMonth(date: Date) {
//   let startDate = getFullDate(date.setDate(1));//当月第一天
//   return startDate
// }

// export function getEndMonth(date: Date) {
//   let fullYear = date.getFullYear();
//   let month = date.getMonth() + 1;
//   let endOfMonth = new Date(fullYear, month, 0).getDate(); // 获取本月最后一天
//   let endDate = getFullDate(date.setDate(endOfMonth));//当月最后一天
//   return endDate
// }