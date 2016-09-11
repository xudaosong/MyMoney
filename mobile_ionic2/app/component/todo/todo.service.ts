import { Injectable } from '@angular/core';
import { Storage, LocalStorage } from 'ionic-angular'
import { TodoModel } from './todo.model'

@Injectable()
export class TodoService {
  data: TodoModel[]
  StorageName: string
  storage: Storage
  constructor() {
    this.StorageName = 'myMoney-todo'
    this.storage = new Storage(LocalStorage, { name: this.StorageName })
    this.get()
  }

  get(): Promise<TodoModel[]> {
    return this.storage.get(this.StorageName).then((todos) => {
      todos = JSON.parse(todos) || []
      todos = todos.sort((a, b) => {
        if (a.state - b.state === 0) {
          return new Date(b.created).getTime() - new Date(a.created).getTime()
        } else {
          return a.state - b.state
        }
      })
      this.data = todos
      return todos;
    })
  }

  save(item: TodoModel): void {
    if (!this.data) {
      this.data = [item]
    } else {
      this.data.splice(0, 0, item)
    }
    item.created = new Date()
    item.state = 0
    let newItem = JSON.stringify(this.data)
    this.storage.set(this.StorageName, newItem)
  }

  update(item: TodoModel, index: number): void {
    this.data[index] = item
    let updatedList = JSON.stringify(this.data)
    this.storage.set(this.StorageName, updatedList)
  }

  remove(index: number): void {
    this.data.splice(index, 1)
    let updatedList = JSON.stringify(this.data)
    this.storage.set(this.StorageName, updatedList)
  }
}
