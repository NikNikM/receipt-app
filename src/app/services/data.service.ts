import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

export interface Message {
  merchant: string;
  total: number;
  transactionDate: string;
  id?: number;
  items: Item[];
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[];
  public mockMessages: Message[] = [
    {
      merchant: 'Yet another market',
      total: 23.22,
      transactionDate: '2021-09-15T13:22:11',
      id: 8,
      items: [
        {name: 'Item5', quantity: 3, price: 5.22},
        {name: 'Item6', quantity: 3, price: 6.22}
      ]
    },
    {
      merchant: 'Coop',
      total: 9.22,
      transactionDate: '2021-09-15T12:22:11',
      id: 7,
      items: [
        {name: 'Item1', quantity: 3, price: 1.22},
        {name: 'Item2', quantity: 3, price: 2.22}
      ]
    },
    {
      merchant: 'Migros',
      total: 100.22,
      transactionDate: '2021-09-14T11:22:11',
      id: 6,
      items: [
        {name: 'Item5', quantity: 3, price: 5.22},
        {name: 'Item6', quantity: 3, price: 6.22}
      ]
    },
    {
      merchant: 'Coop',
      total: 12.66,
      transactionDate: '2021-09-13T10:22:11',
      id: 5,
      items: [
        {name: 'Item2', quantity: 3, price: 5.22},
        {name: 'Item3', quantity: 3, price: 6.22}
      ]
    },
    {
      merchant: 'Denner',
      total: 12.22,
      transactionDate: '2021-09-12T09:22:11',
      id: 4,
      items: [
        {name: 'Item7', quantity: 3, price: 1.22},
        {name: 'Item8', quantity: 3, price: 2.22}
      ]
    },
    {
      merchant: 'Lidl',
      total: 12.99,
      transactionDate: '2021-09-11T08:22:11',
      id: 3,
      items: [
        {name: 'Item5', quantity: 3, price: 5.22},
        {name: 'Item6', quantity: 3, price: 6.22}
      ]
    },
    {
      merchant: 'Migros',
      total: 9.22,
      transactionDate: '2021-09-10T07:22:11',
      id: 2,
      items: [
        {name: 'Item5', quantity: 3, price: 5.22},
        {name: 'Item6', quantity: 3, price: 6.22}
      ]
    },
    {
      merchant: 'Coop',
      total: 2.22,
      transactionDate: '2021-09-09T07:22:11',
      id: 1,
      items: [
        {name: 'Item5', quantity: 3, price: 5.22},
        {name: 'Item6', quantity: 3, price: 6.22}
      ]
    },
    {
      merchant: 'Migros',
      total: 23.22,
      transactionDate: '2021-09-08T06:22:11',
      id: 0,
      items: [
        {name: 'Item5', quantity: 3, price: 5.22},
        {name: 'Item6', quantity: 3, price: 6.22}
      ]
    }
  ];

  constructor(private httpClient: HttpClient) { }

  public getMockMessages(): Message[] {
    if(this.messages === undefined) {
      this.messages = this.mockMessages;
    }
    return this.messages;
  }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages.find(message => message.id === id);
  }

  addMessage(newMessage: Message) {
    // assign an id to the message
    const messages = this.getMessages();

    // last message id + 1
    newMessage.id = messages[0].id + 1;
    // add the message at first position and shifts the others
    this.messages.unshift(newMessage);
  }

  /*public getMessageFromReceipt(uri: string) {
    const message: Message = {
      merchant: 'New Supermarkt',
      total: 23.22,
      transactionDate: 'Last Week',
      items: [
        {name: 'Item5', quantity: 3, price: 5.22},
        {name: 'Item6', quantity: 3, price: 6.22}
      ]
    };

    this.addMessage(message);
  }*/

  postReceipt(photo: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('receipt', photo);
    return this.httpClient.post(environment.restApiFormRecognition, formData);
  }
}
