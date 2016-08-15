let isProduction = window.location.host === 'zz-event.oth.web.sdp.101.com'
export default {
    appEnv: 'dev',
    event: isProduction ?
    {
        host: 'http://zz-event.oth.web.sdp.101.com',
        version: 'v1.0'
    } : {
        host: 'http://zz-event.beta.web.sdp.101.com',
        version: 'v1.0'
    },
    user: isProduction ? {
        host: 'http://59.61.182.106:9006/v0.1/'
    } : {
        host: 'http://ptzz-user.dev.web.nd/v0.1/'
    },
    services: [
        {
            name: '便民服务',
            items: [{
                name: '医疗健康',
                ico: require('../images/services/01.png'),
                url: isProduction ?
                    'http://59.61.182.106:9002/' :
                    'http://zongzhi-jk.beta.web.sdp.101.com/'
            }, {
                name: '渔情通',
                ico: require('../images/services/02.png'),
                url: isProduction ?
                    'http://fjyqt.oth.web.sdp.101.com' :
                    'http://fjyqt.oth.web.sdp.101.com'
            }, {
                name: '社区活动',
                ico: require('../images/services/03.png'),
                url: isProduction ?
                    'cmp://com.nd.social.activity/actList?actTitleBackBtnFlag=VIEW_SHOW&areaCode=350000' :
                    'cmp://com.nd.social.activity/actList?actTitleBackBtnFlag=VIEW_SHOW&areaCode=350000'
            }, {
                name: '微博广场',
                ico: require('../images/services/04.png'),
                url: isProduction ?
                    'cmp://com.nd.social.weibo/weiboSquareList' :
                    'cmp://com.nd.social.weibo/weiboSquareList'
            }, {
                name: '居家养老',
                ico: require('../images/services/05.png'),
                url: isProduction ?
                    'cmp://com.nd.social.socialshop/goodsList' :
                    'cmp://com.nd.social.socialshop/goodsList'
            }, {
                name: '生活缴费',
                ico: require('../images/services/06.png'),
                url: 'javascript:;'
            }, {
                name: '教育服务',
                ico: require('../images/services/07.png'),
                url: 'javascript:;'
            }, {
                name: '票务服务',
                ico: require('../images/services/08.png'),
                url: 'javascript:;'
            }, {
                name: '邻里互动',
                ico: require('../images/services/09.png'),
                url: 'javascript:;'
            }]
        },
        {
            name: '证件一生',
            items: [{
                name: '户政',
                ico: require('../images/services/11.png'),
                url: isProduction ?
                    'http://59.61.182.106:8081/ptwgapp/client/page/phone/default/html/Hzlist.jsp' :
                    'http://59.61.182.106:8081/ptwgapp/client/page/phone/default/html/Hzlist.jsp'
            }, {
                name: '婚姻登记',
                ico: require('../images/services/12.png'),
                url: isProduction ?
                    'http://www.ptxzfwzx.gov.cn/ptolss/html/marriage.html' :
                    'http://www.ptxzfwzx.gov.cn/ptolss/html/marriage.html'
            }, {
                name: '退休审核',
                ico: require('../images/services/13.png'),
                url: isProduction ?
                    'http://www.ptxzfwzx.gov.cn/ptolss/html/employee.html' :
                    'http://www.ptxzfwzx.gov.cn/ptolss/html/employee.html'
            }, {
                name: '老年证申请',
                ico: require('../images/services/14.png'),
                url: isProduction ?
                    'http://sg-affair.oth.web.sdp.101.com/dist/#/apply/older' :
                    'http://sg-affair.beta.web.sdp.101.com/dist/#/apply/older'
            }]
        },
        {
            name: '出行',
            items: [{
                name: '行驶证补换',
                ico: require('../images/services/21.png'),
                url: isProduction ?
                    'http://www.ptxzfwzx.gov.cn/ptolss/html/car.html' :
                    'http://www.ptxzfwzx.gov.cn/ptolss/html/car.html'
            }, {
                name: '护照签发',
                ico: require('../images/services/22.png'),
                url: isProduction ?
                    'http://www.ptxzfwzx.gov.cn/ptolss/html/passport.html' :
                    'http://www.ptxzfwzx.gov.cn/ptolss/html/passport.html'
            }, {
                name: '出入境',
                ico: require('../images/services/23.png'),
                url: isProduction ?
                    'http://59.61.182.106:8081/ptwgapp/client/page/phone/default/html/Crjlist.jsp' :
                    'http://59.61.182.106:8081/ptwgapp/client/page/phone/default/html/Crjlist.jsp'
            }, {
                name: '边防',
                ico: require('../images/services/24.png'),
                url: isProduction ?
                    'http://59.61.182.106:8081/ptwgapp/client/page/phone/default/html/bf_list.jsp' :
                    'http://59.61.182.106:8081/ptwgapp/client/page/phone/default/html/bf_list.jsp'
            }]
        },
        {
            name: '救助',
            items: [{
                name: '低保申请',
                ico: require('../images/services/31.png'),
                url: isProduction ?
                    'http://sg-affair.oth.web.sdp.101.com/dist/#/apply/lowIncome' :
                    'http://sg-affair.beta.web.sdp.101.com/dist/#/apply/lowIncome'
            }, {
                name: '救灾申请',
                ico: require('../images/services/32.png'),
                url: isProduction ?
                    'http://sg-affair.oth.web.sdp.101.com/dist/?title=救灾申请#reliefApply' :
                    'http://sg-affair.beta.web.sdp.101.com/dist/?title=救灾申请#reliefApply'
            }, {
                name: '救助申请',
                ico: require('../images/services/33.png'),
                url: isProduction ?
                    'http://sg-affair.oth.web.sdp.101.com/dist/?title=救助申请#/tempReliefApply' :
                    'http://sg-affair.beta.web.sdp.101.com/dist/?title=救助申请#/tempReliefApply'
            }]
        },
        {
            name: '其他',
            items: [{
                name: '治安',
                ico: require('../images/services/41.png'),
                url: isProduction ?
                    'http://59.61.182.106:8081/ptwgapp/client/page/phone/default/html/Zalist.jsp' :
                    'http://59.61.182.106:8081/ptwgapp/client/page/phone/default/html/Zalist.jsp'
            }, {
                name: '网安',
                ico: require('../images/services/42.png'),
                url: isProduction ?
                    'http://59.61.182.106:8081/ptwgapp/client/page/phone/default/html/wa_list.jsp' :
                    'http://59.61.182.106:8081/ptwgapp/client/page/phone/default/html/wa_list.jsp'
            }, {
                name: '监管',
                ico: require('../images/services/43.png'),
                url: isProduction ?
                    'http://59.61.182.106:8081/ptwgapp/client/page/phone/default/html/jg_list.jsp' :
                    'http://59.61.182.106:8081/ptwgapp/client/page/phone/default/html/jg_list.jsp'
            }]
        }
    ],
}

