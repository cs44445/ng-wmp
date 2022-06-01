import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '../business/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient, private ls: LocalStorageService) { }

  downloadFile(route: string, filename: string = ''): void {
    const baseUrl = 'http://myserver/index.php/api';
    const token = this.ls.get('token', '')
    const headers = new HttpHeaders().set('authorization', token);
    this.http.get(baseUrl + route, { headers, responseType: 'blob' as 'json' }).subscribe(
      (response: any) => {
        let dataType = response.type;
        let binaryData = [];
        binaryData.push(response);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: dataType }));
        if (filename)
          downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }
}


// import axios from 'axios'
// import store from '@/store'
// import message from '@/element-ui/message'

// exportShipment(params:any) {
//   return
//   return download({
//     url: '/service/misc-wmp-user/api/v1/exportShipment',
//     params
//   })
// }

// http://localhost:9000/service/misc-wmp-user/api/v1/exportShipment?trackingNos=1ZZ6H98T6700029412

// http://localhost:9000/service/misc-wmp-user/api/v1/exportShipment?trackingNos=1ZZ6H98T6700029412,1ZZ6H97T6700018612,1Z5LD5T10420025815

// export default function download(config) {
//   return new Promise((resolve, reject) => {
//     axios({
//       ...config,
//       baseURL: envConfig.VUE_APP_BASE_API,
//       url: envConfig.VUE_APP_BASE_API ? config.url.split('/service')[1] : config.url,
//       headers: {
//         Authorization: store.getters['user/token']
//       },
//       responseType: 'blob'
//     }).then((response) => {
//       const res = response.data
//       let fileName = response.headers['content-disposition'].split('filename=')[1]
//       try {
//         fileName = JSON.parse(fileName)
//       } catch(e) {}
//       const type = response.headers['content-type']
//       const blob = new Blob([res], { type })
//       if (window.navigator.msSaveBlob) {	// IE以及IE内核的浏览器
//         try {
//           window.navigator.msSaveOrOpenBlob(blob, fileName)	// 此方法类似上面的方法，区别可自行百度
//         } catch (e) {
//           console.log(e)
//         }
//       } else {
//         const href = URL.createObjectURL(blob)
//         const downloadElement = document.createElement('a')
//         downloadElement.href = href
//         downloadElement.download = fileName
//         document.body.appendChild(downloadElement)
//         downloadElement.click()
//         URL.revokeObjectURL(downloadElement.href)
//         document.body.removeChild(downloadElement)
//       }
//       resolve(response)
//     }).catch((e) => {
//       message({ message: 'error', type: 'error' })
//       reject()
//     })
//   })
// }


