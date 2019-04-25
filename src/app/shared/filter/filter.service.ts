import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class FilterService {
  private filterSource = new Subject<string>();

  filterValue$ = this.filterSource.asObservable();

  constructor() { }

  setNexFilterValue(value: string): void {
    this.filterSource.next(value);
  }
}
