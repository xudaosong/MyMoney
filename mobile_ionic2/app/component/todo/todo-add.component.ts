import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {TodoModel} from './todo.model'
/*
 Generated class for the TodoPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/component/todo/todo-add.component.html',
})
export class TodoAddComponent {
  isEdit: boolean
  todo: TodoModel

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    let todo = navParams.get('todo')
    if (typeof todo === 'undefined') {
      this.todo = new TodoModel()
      this.isEdit = false
    } else {
      this.todo = todo
      this.isEdit = true
    }
  }

  saveItem() {
    if (!this.todo.description) {
      return false
    }
    this.navParams.get('listPage').saveTodo(this.todo,this.navParams.get('index'))
    this.todo = new TodoModel()
    this.navCtrl.pop()
  }

}
