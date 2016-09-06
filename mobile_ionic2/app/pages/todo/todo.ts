import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TodoAddPage } from './todo-add';
import { TodoModel } from '../../providers/todo.model'
import { TodoService } from '../../providers/todo.service'

/*
 Generated class for the TodoPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/pages/todo/todo.html',
})
export class TodoPage {
  todos: TodoModel[]

  todoService: TodoService

  constructor(private navCtrl: NavController) {
    this.todoService = new TodoService()
  }

  getTodos(): void {
    this.todoService.get().then((todos) => {
      // console.log(todos)
      this.todos = todos
    })
  }

  ngOnInit(): void {
    this.getTodos()
  }

  saveTodo(item, index) {
    if (typeof index === 'undefined') {
      this.todoService.save(item)
    } else {
      this.todoService.update(item, index)
    }
    this.getTodos()
  }

  addTodo() {
    this.navCtrl.push(TodoAddPage, {
      listPage: this
    })
  }

  editTodo(index, todo) {
    this.navCtrl.push(TodoAddPage, {
      listPage: this,
      index: index,
      todo: todo
    })
  }

  changeState(todo,index){
    todo.state = todo.state === 0 ?1:0
    this.todoService.update(todo,index)
    this.getTodos()
  }

  removeTodo(index) {
    this.todoService.remove(index)
    this.getTodos()
  }
}
