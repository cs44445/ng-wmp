import { HttpParams } from '@angular/common/http';
import { stringify } from 'qs';

export function setParmas(args: any) {
  return new HttpParams({ fromString: stringify(args) })
}