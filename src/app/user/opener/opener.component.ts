import { Component, HostListener, OnInit } from '@angular/core';
import { PostMessageService } from '../../core/post-message.service';

@Component({
  selector: 'app-opener',
  templateUrl: './opener.component.html',
  styleUrls: ['./opener.component.scss']
})
export class OpenerComponent implements OnInit {
  popup: any;

  constructor(private postMessageService: PostMessageService) { }

  ngOnInit() {
    //
    // Close popup on close opener (parent window)
    //
    window.addEventListener('beforeunload', (e) => {
        if (this.popup && !this.popup.closed) {
            this.popup.close();
            console.log('this.popup--', this.popup);
        }
    });

    (window as any).ProcessCommentaryMessage = this.ProcessChildMessage;

    window.addEventListener('ProcessCommentaryMessage', (message) => {
        console.log('-----------message----------', message);
    });
  }

  popupOpenClose() {
      if (this.popup && !this.popup.closed) {
          this.popup.close();

      } else {
        console.log('popup opened!!');
        this.popup = window.open('http://localhost:4200/user/popup', '', 'width=300,height=300,top=400,left=400');

        // /* when popup is about to close */
        this.popup.addEventListener('beforeunload', (e: any) => {
            console.log('before close', e);
            console.log('addEventListener popup closed!!');
            this.popup = null;
        });

      }
  }

  ProcessChildMessage(message) {
    // do something with the message
    console.log('-------message in parent-----', message);
  }

  @HostListener('window:message', ['$event'])
  onMessage(e: any) {
      console.log('e', e);
      if (e.data) {

      }
  }

  popupFocus() {
      if (this.popup) {
          console.log('popup focused!!!');
          this.popup.focus();
      }
  }

}
