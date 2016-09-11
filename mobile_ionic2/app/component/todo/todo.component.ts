import { Component, OnInit } from '@angular/core'
import { NavController } from 'ionic-angular'
import { TodoAddComponent } from './todo-add.component'
import { TodoModel } from './todo.model'
import { TodoService } from './todo.service'
import { DialogService } from '../common/dialog.service'

/*
 Generated class for the TodoPage page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  templateUrl: 'build/component/todo/todo.component.html',
  providers: [TodoService, DialogService],
})
export class TodoComponent implements OnInit {
  todos: TodoModel[]

  constructor(private navCtrl: NavController, private todoService: TodoService, private dialog: DialogService) {
    
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
     // console.log('TodoComponent:canGoBack',this.navCtrl.canGoBack())
    this.navCtrl.push(TodoAddComponent, {
      listPage: this
    })
  }

  editTodo(index, todo) {
    this.navCtrl.push(TodoAddComponent, {
      listPage: this,
      index: index,
      todo: todo
    })
  }

  changeState(todo, index) {
    todo.state = todo.state === 0 ? 1 : 0
    this.todoService.update(todo, index)
    this.getTodos()
  }

  removeTodo(index) {
    this.dialog.confirm('确定要删除该待办事项吗？', () => {
      this.todoService.remove(index)
      this.getTodos()
    })
  }
}
