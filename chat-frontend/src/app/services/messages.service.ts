import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Message, MessageData } from '../model/message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  messages!: Message[] | null;
  messagesChange = new Subject<Message[]>();
  messagesFetching = new Subject<boolean>();
  interval!: number;

  constructor(private http: HttpClient) { }

  getMessages() {
    this.messagesFetching.next(true);
    return this.http.get<Message[]>(environment.apiUrl + '/messages')
      .pipe(map(result => {
        if (result === null) {
          return [];
        }
        return result.map(messageData => {
          return new Message(messageData.id, messageData.message, messageData.author, messageData.dateTime);
        });
      }))
      .subscribe(messages => {
        this.messages = messages;
        this.messagesChange.next(this.messages.slice());
        this.messagesFetching.next(false);
      });
  }

  getInterval(lastDate: string) {
    this.interval = setInterval()
  }

  createMessage(message: MessageData) {
    return this.http.post(environment.apiUrl + '/messages', message);
  };

  stop(){
    clearInterval(this.interval);
  }
}
