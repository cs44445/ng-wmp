import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const PREFFIX = environment.VUE_APP_BASE_API || 'vue_app_base_api'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  set(key: string, value: any) {
    localStorage.setItem(`${PREFFIX}-${key}`, JSON.stringify(value))
  }

  get(key: string, defaultValue?: any) {
    const item = localStorage.getItem(`${PREFFIX}-${key}`) || defaultValue
    let data
    try {
      return data = JSON.parse(item)
    } catch (error) {
      data = defaultValue
    }
  }

  remove(key: string) {
    localStorage.removeItem(`${PREFFIX}-${key}`)
  }

  clear() {
    localStorage.clear()
  }
}
