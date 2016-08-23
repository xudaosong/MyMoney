import React from 'react';
import CircularProgress from 'material-ui/CircularProgress'
export default class Loading extends React.Component {
    render(){
        return (
            <div style={{textAlign:'center'}}>
                <CircularProgress size={.5} />
            </div>
        )
    }
}