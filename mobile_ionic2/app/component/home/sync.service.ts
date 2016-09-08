import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http'
import { Storage, LocalStorage, ToastController } from 'ionic-angular'
import 'rxjs/add/operator/toPromise'
@Injectable()
export class SyncService {
    currentUser = null
    setting = null
    constructor(private http: Http, private toastCtrl: ToastController) {
        let currentUser = window.sessionStorage.getItem('currentUser') || null
        if (typeof currentUser === 'string') {
            this.currentUser = JSON.parse(currentUser)
        }
    }
    getUrl(resPath) {
        let setting = window.localStorage.getItem('setting') || {}
        if (typeof setting === 'string') {
            setting = JSON.parse(setting)
        }
        this.setting = setting
        return `http://${setting.serverAddress}/${resPath}`
    }
    login() {
        if (!!this.currentUser) {
            return Promise.resolve(this.currentUser)
        }
        let url = this.getUrl('api/login')
        let setting = this.setting
        let headers = new Headers({
            'Content-Type': 'application/json; charset=utf-8',
        })
        return this.http.post(url, JSON.stringify({ username: setting.account, password: setting.password }), {
            headers: headers
        }).toPromise().then(response => {
            if (response.ok) {
                this.currentUser = response.json()
                window.sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser))
                return this.currentUser
            } else {
                return false
            }
        }).catch((response) => {
            this._handleError(response, '登录')
        })
    }
   syncGET() {
        return this.login().then((currentUser) => {
            let headers = new Headers({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + currentUser.token
            })
            return this.http.get(this.getUrl('api/sync'), { headers: headers }).toPromise().then((response) => {
                if (response.ok) {
                    let result = response.json()
                    this._sync(result.Stock)
                    this._syncTechnology(result.StockTechnology)
                    this.toast('数据拉取成功')
                }
            }).catch((response) => {
                this._handleError(response, '数据拉取')
            })
        })
    }
    syncPOST() {
        return this.login().then((currentUser) => {
            let url = this.getUrl('api/sync')
            let headers = new Headers({
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ' + currentUser.token
            })
            let stockData = window.localStorage.getItem('stock') || []
            let stockTechnologyData = window.localStorage.getItem('stockTechnology') || []
            if (typeof stockData === 'string') {
                stockData = JSON.parse(stockData)
            }
            if (typeof stockTechnologyData === 'string') {
                stockTechnologyData = JSON.parse(stockTechnologyData)
            }
            return this.http.post(url, JSON.stringify({ Stock: stockData, StockTechnology: stockTechnologyData }), { headers: headers })
                .toPromise()
                .then((response) => {
                    if (response.ok) {
                        this.toast('数据推送成功')
                    }
                }).catch((response) => {
                    this._handleError(response, '数据推送')
                })
        })
    }
    
    private _handleError(response, message) {
        switch (response.status) {
            case 401:
                this.toast('请先登录')
                break;
            case 500:
                this.toast(`${message}失败,原因：${response.json().result.messages.j}`)
                break;
            case 404:
                this.toast(`${message}失败，接口无法访问`)
                break;
            default:
                this.toast(`${message}失败`)
                break;
        }
    }
    private toast(message: string) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 5000
        })

        toast.present(toast)
    }
    private _sync(data) {
        window.localStorage.setItem('stock', JSON.stringify(data))
    }
    private _syncTechnology(data) {
        window.localStorage.setItem('stockTechnology', JSON.stringify(data))
    }
}