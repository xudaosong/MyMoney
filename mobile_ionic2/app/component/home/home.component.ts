import {Component} from '@angular/core'
import {NavController} from 'ionic-angular'

import {TodoComponent} from '../todo/todo.component'
import {SyncService} from './sync.service'
import {DialogService} from '../common/dialog.service'

@Component({
  templateUrl: 'build/component/home/home.component.html',
  providers: [SyncService, DialogService],
})
export class HomeComponent {
  items = []

  constructor(private navCtrl: NavController, private syncService: SyncService, private dialog: DialogService) {
    this.items = [
      {
        'title': '操盘',
        'icon': 'card',
        'href': 'react.html#/stock',
      }, {
        'title': '操盘技术',
        'icon': 'trending-up',
        'href': 'react.html#/stock/technology',
      }, {
        'title': '待办事项',
        'icon': 'bookmarks',
        'component': TodoComponent,
      }, {
        'title': '拉取',
        'icon': 'cloud-download',
        'callback': this.pull,
      }, {
        'title': '推送',
        'icon': 'cloud-upload',
        'callback': this.push,
      }, {
        'title': '设置',
        'icon': 'settings',
        'href': 'react.html#/setting',
      }
    ]
  }

  pull = () => {
    this.dialog.confirm('确定要从服务器拉取数据到本地吗？', () => {
      this.syncService.syncGET()
    })
  }

  push = () => {
    this.dialog.confirm('确定要把本地数据上传到服务器吗？', () => {
      this.syncService.syncPOST()
    })
  }

  goto(item) {
    if (item.component) {
      this.navCtrl.push(item.component)
    } else if (item.href) {
      window.location.href = item.href
    } else if (item.callback) {
      item.callback()
    }
  }
}
