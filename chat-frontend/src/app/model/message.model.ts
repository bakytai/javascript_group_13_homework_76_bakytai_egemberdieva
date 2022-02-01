export class Message {
  constructor(
    public id: string,
    public message: string,
    public author: string,
    public dateTime: string
  ) {}
}

export interface MessageData {
  message: string,
  author: string,
}
