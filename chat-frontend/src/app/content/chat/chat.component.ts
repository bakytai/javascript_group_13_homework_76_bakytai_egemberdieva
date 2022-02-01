import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message.model';
import { MessagesService } from '../../services/messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  messagesSubscription!: Subscription;
  isFetchingSubscription!: Subscription;
  isFetching = false;

  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
    this.messagesSubscription = this.messageService.messagesChange.subscribe((messages: Message[]) => {
      this.messages = messages;
      const date = this.messages[this.messages.length - 1];
      console.log(date.dateTime);
      this.messageService.getInterval(date.dateTime);
    });
    this.isFetchingSubscription = this.messageService.messagesFetching.subscribe((isFetching: boolean) => {
      this.isFetching = isFetching;
    });

    this.messageService.getMessages();
  }

}
