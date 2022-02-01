import { Component, OnInit } from '@angular/core';
import { Message } from '../../model/message.model';
import { MessagesService } from '../../services/messages.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];

  constructor(private messageService: MessagesService) { }

  ngOnInit(): void {
    this.messageService.getMessages().subscribe(messages => {
      this.messages = messages;
      console.log(this.messages);
    })
  }

}
