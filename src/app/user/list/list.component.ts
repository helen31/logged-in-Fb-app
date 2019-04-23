import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { ProfileResultInterface } from '../../shared/models/profile.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    userList: ProfileResultInterface[];
    searchByName: string;

  constructor(private userService: UserService) {
    this.userService.getUserList().subscribe(
        (responce) => {
          this.userList = responce.result; // todo make it observable stream
        }
    );
  }

  ngOnInit() {
  }

}
