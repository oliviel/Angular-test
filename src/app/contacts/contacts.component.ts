import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../services/post.service';
import uuid from 'uuid';
import { User } from "../user";


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {
  users: any;
  usersTypeCode: any;
  userModel = new User('', '', '', '');

  constructor(http: HttpClient, private _postServices: PostService) { 
    http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe(response => {
        this.usersTypeCode = response;
        console.log(this.users)
      })

    http.get('http://localhost:3000/users')
      .subscribe(response => {
        this.users = response;
        console.log(this.users)
      })
  }

  onSubmit() {
    this.userModel.id = uuid();
    this._postServices.addUser(this.userModel)
      .subscribe(
        user => {
          console.log('sucess', user);
          this.users.push(user);
          this.userModel.id = ''
          this.userModel.name = ''
          this.userModel.email = ''
          this.userModel.phone = ''
        },
        error => console.log('Error', error)
      );
  }  

  onDelete(user) {
    this._postServices.removeUser(user.id)
      .subscribe(response => {
        let index = this.users.indexOf(user);
        this.users.splice(index, 1)
      })
  }

  ngOnInit() {
  }

}
