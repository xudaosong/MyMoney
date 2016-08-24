import React,{Component} from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import RedTheme from './redTheme'

const muiTheme = getMuiTheme(RedTheme);
let container = null
export default class ConfirmDialog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true
        }
    }

    handleClose = () => {
        this.setState({open: false})
        if (container) {
            ReactDOM.unmountComponentAtNode(container)
            document.body.removeChild(container)
            container = null
        }
    }

    handleConfirm = ()=> {
        this.props.onConfirm && this.props.onConfirm()
        this.handleClose()

    }

    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="确认"
                primary={true}
                onTouchTap={this.handleConfirm}
            />,
        ]

        return (
            <Dialog
                title='询问'
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                {this.props.content}
            </Dialog>
        )
    }

    static show(content, onConfirm) {
        container = document.createElement('div')
        let props = {content: content, onConfirm: onConfirm}
        document.body.appendChild(container)
        ReactDOM.render(
            <MuiThemeProvider muiTheme={muiTheme}>
                <ConfirmDialog {...props} />
            </MuiThemeProvider>,
            container
        )
        return {
            destroy(){
                if (container) {
                    ReactDOM.unmountComponentAtNode(container)
                    document.body.removeChild(container)
                    container = null
                }
            }
        }
    }
}