import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { UserService } from '../user.service';
import { ProfileInterface } from '../../shared/models/profile.interface';
import { FilterService } from '../../shared/filter/filter.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
    userList;
    searchText: string;
    subscriptionFilterValue$: Subscription;
    subscriptionUserList$: Subscription;

    constructor(private userService: UserService, private filterService: FilterService) {}

  ngOnInit() {
      this.subscriptionFilterValue$ = this.filterService.filterValue$.subscribe(
          (value: string) => {
              this.searchText = value;
          }
      );
      this.subscriptionUserList$ = this.userService.userList$.subscribe(
          (data: ProfileInterface[]) => {
              this.userList = data;
          }
      );
  }

  ngOnDestroy() {
      this.subscriptionFilterValue$.unsubscribe();
      this.subscriptionUserList$.unsubscribe();
  }

}
