import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MessagesService } from '../../services/messages.service';
import { MessageData } from '../../model/message.model';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent {
  @ViewChild('f') form!: NgForm;
  spinner = false;
  constructor(private messageService: MessagesService) {}

  onSubmit() {
    this.spinner = true
    const messageData: MessageData = {
      message: this.form.value.message,
      author: this.form.value.author
    }
    this.messageService.createMessage(messageData).subscribe(() => {
      this.messageService.getMessages();
      this.spinner = false;
    });
  }
}
