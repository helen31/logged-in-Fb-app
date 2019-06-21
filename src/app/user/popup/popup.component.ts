import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PostMessageService } from '../../core/post-message.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, AfterViewInit {
  opener: Window;

  constructor(private postMessageService: PostMessageService) { }

  ngOnInit() {
    this.opener = window.opener;

    // if no opener, close popup
    if (!this.opener) {
      window.close();
    }

    // window.addEventListener('unload', (e: any) => {
    //     e.preventDefault();
    //   this.sendMessageHandler('--------------closed---------------');
    //     console.log('-----------------onClose event------------', e);
    // });

    // window.addEventListener('unload', (e: any) => {
    //   e.preventDefault();
    //   console.log('onClose event--', e);
    // });

  }

  ngAfterViewInit(): void {
    this.postMessageService.postMessageEvents$.subscribe(data => {
      console.log('eventType >>>>>>>>.', data);
      this.signal(data);
    });

    setTimeout(() => {
      this.postMessageService.nextPostMessageData('404 error');
      this.postMessageService.nextBroadcastError();
    }, 10000);

    setTimeout(() => {
      this.postMessageService.nextPostMessageData('500 error');
      this.postMessageService.nextBroadcastError();
    }, 20000);

  }

  // sendMessageHandler(status, message: string) { // this.opener.postMessage(message//'http://localhost:4200/user/opener'
  //   (this.opener as any).ProcessCommentaryMessage({status, message});
  // }

  // sendMessageHandler(message: any) {
  //   this.opener.postMessage(message, 'localhost:4200/user/opener'); //'http://localhost:4200/user/opener'
  // }

  signal(data: any) {
   this.opener.postMessage(data, '*');
  }

}
