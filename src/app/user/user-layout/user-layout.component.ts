import { Component, OnInit } from '@angular/core';

import { UserService } from '../user.service';
import { QueryResponseInterface } from '../../shared/models/query-response.interface';


@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit {

    constructor(private userService: UserService) {
        this.getUserList();
    }

    ngOnInit() {
    }

    getUserList(): void {
        this.userService.getUserList().subscribe(
        (response: QueryResponseInterface) => {
                this.userService.setNextUserListData(response.result);
            }
        );
    }

}
