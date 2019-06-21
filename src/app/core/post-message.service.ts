import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, merge, Observable, Subject } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

interface PostMessageEvent {
  type: string;
  data?: string;
}

enum EventTypes {
  load = 'broadcastOpen',
  unload = 'broadcastClose',
  broadcast = 'broadcastError'
}


@Injectable()
export class PostMessageService {
  public postMessageEvents$: Observable<PostMessageEvent>;
  public broadcastError$: Observable<void>;
  public postMessageData$: Observable<string>;

  private broadcastErrorSource: Subject<void> = new Subject();
  private postMessageDataSource: Subject<string> = new BehaviorSubject(null);

  constructor() {
    this.broadcastError$ = this.broadcastErrorSource.asObservable();
    this.postMessageData$ = this.postMessageDataSource.asObservable();

    this.postMessageEvents$ = merge(
      fromEvent(window, 'load'),
      fromEvent(window, 'unload'),
      this.broadcastError$
    ).pipe(
      withLatestFrom(this.postMessageData$),
      map(([event, data]: [Event | undefined, string]) => {
        console.log('[event, data]', [event, data]);
        return event ? { type: EventTypes[event.type], data } : { type: EventTypes.broadcast, data };
      } )
    );
  }

  public nextBroadcastError(): void {
    this.broadcastErrorSource.next();
  }

  public nextPostMessageData(message: string): void {
    this.postMessageDataSource.next(message);
  }

}
