require('./styles/money.scss')

import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import {Router, Route,IndexRoute, hashHistory} from 'react-router'

import StockList from './components/StockList'
import StockAdd from './components/StockAdd'
import StockOperation from './components/StockOperation'
import StockDetail from './components/StockDetail'
import MainContainer from './components/MainContainer'

injectTapEventPlugin();

const AppRouter = (
    <Router history={hashHistory}>
        <Route path="/" component={StockList}/>
        <Route path="stock" component={StockList}/>
        <Route path="/stock/add" component={StockAdd}/>
        <Route path="/stock/operation/:id" component={StockOperation}/>
        <Route path="/stock/detail/:id" component={StockDetail}/>
    </Router>
)

/*const AppRouter = (
 <Router history={hashHistory}>
 <Route path="/" component={MainContainer}>
 <IndexRoute component={StockList}/>
 <Route path="stock" component={StockList}/>
 <Route path="/stock/add" component={StockAdd}/>
 <Route path="/stock/operation" component={StockOperation}/>
 </Route>
 </Router>
 )*/

const muiTheme = getMuiTheme({
    fontFamily: 'Microsoft YaHei',
    appBar: {
        height: 48,
    },
    palette: {
        primary1Color: '#da301c',
        primary2Color: '#da301c',
        pickerHeaderColor: '#da301c',
        accent1Color: '#38adff',
        borderColor: '#ebebeb',
        textColor: '#000',
    },
    radioButton: {
        borderColor: '#999'
    },
    raisedButton: {
        fontSize: 16,
    },
    flatButton: {
        fontSize: 16,
    },
    tabs: {
        backgroundColor: '#fff',
        textColor: '#000',
        selectedTextColor: '#da301c',
    },
    textField: {
        width: '100%',
    },
    inkBar: {
        backgroundColor: '#da301c'
    },
});

ReactDOM.render((
    <MuiThemeProvider muiTheme={muiTheme}>
        {AppRouter}
    </MuiThemeProvider>
), document.getElementById('root'));

