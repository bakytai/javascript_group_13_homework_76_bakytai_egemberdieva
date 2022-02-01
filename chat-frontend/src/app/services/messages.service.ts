import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Message, MessageData } from '../model/message.model';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private http: HttpClient) { }

  getMessages() {
    return this.http.get<Message[]>(environment.apiUrl + '/messages').pipe(
      map(response => {
        return response.map(messageData => {
          return new Message(messageData.id, messageData.message, messageData.author, messageData.dateTime
          );
        });
      })
    )
  }

  createMessage(message: MessageData) {
    return this.http.post(environment.apiUrl + '/messages', message);
  }
}
