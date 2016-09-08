import {Component} from '@angular/core'
import {NavController} from 'ionic-angular'

import {TodoComponent} from '../todo/todo.component'
import {SyncService} from './sync.service'

@Component({
  templateUrl: 'build/component/home/home.component.html',
  providers: [SyncService],
})
export class HomeComponent {
  items = []
  
  constructor(private navCtrl: NavController,syncService: SyncService) {
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
        'callback':syncService.syncGET.bind(syncService),
      }, {
        'title': '推送',
        'icon': 'cloud-upload',
        'callback':syncService.syncPOST.bind(syncService),
      }, {
        'title': '设置',
        'icon': 'settings',
        'href': 'react.html#/setting',
      }
    ]
  }

  goto(item) {
    if (item.component) {
      this.navCtrl.push(item.component)
    } else if (item.href) {
      window.location.href = item.href
    } else if(item.callback){
      item.callback()
    }
  }
}
