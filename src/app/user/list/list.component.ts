import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { UserService } from '../user.service';
import { ProfileInterface, ProfileResultInterface } from '../../shared/models/profile.interface';
import { FilterService } from '../../shared/filter/filter.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
    userList: ProfileResultInterface[];
    searchText: string;
    subscriptionFilterValue: Subscription;

  constructor(private userService: UserService, private filterService: FilterService) {
    this.userService.getUserList().subscribe(
        (response) => {
          this.userList = response.result;
        }
    );
  }

  ngOnInit() {
      this.subscriptionFilterValue = this.filterService.$filterValue.subscribe(
          (value: string) => {
              this.searchText = value;
          }
      );
  }

  ngOnDestroy() {
      this.subscriptionFilterValue.unsubscribe();
  }

}
