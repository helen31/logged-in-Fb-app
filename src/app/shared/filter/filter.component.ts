import { Component, OnInit } from '@angular/core';

import { FilterService } from './filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(private filterService: FilterService) { }

  ngOnInit() {
  }

  getInputValueHandler(filterValue: string) {
    this.filterService.setNexFilterValue(filterValue);
  }

}
