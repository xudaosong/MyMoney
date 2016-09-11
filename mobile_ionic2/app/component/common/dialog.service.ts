import {Injectable } from '@angular/core'
import {AlertController} from 'ionic-angular'
@Injectable()
export class DialogService {
    constructor(private alertCtrl: AlertController) {

    }

    confirm(message: string, callback?: Function, host?): void {
        let confirm = this.alertCtrl.create({
            title: '询问',
            message: message,
            buttons: [
                {
                    text: '确定',
                    handler: callback
                }, {
                    role: 'cancel',
                    text: '取消'
                }
            ]
        })
        if (!host) {
            confirm.present()
        } else {
            host.present(confirm)
        }
    }
}