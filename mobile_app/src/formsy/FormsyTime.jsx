import React from 'react';
import Formsy from 'formsy-react';
import TimePicker from 'material-ui/TimePicker';
import { setMuiComponentAndMaybeFocus } from './utils';

const FormsyTime = React.createClass({

  propTypes: {
    defaultTime: React.PropTypes.object,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    value: React.PropTypes.object,
  },

  mixins: [Formsy.Mixin],

  componentDidMount() {
    const { defaultTime } = this.props;
    const value = this.getValue();

    if (typeof value === 'undefined' && typeof defaultTime !== 'undefined') {
      this.setValue(defaultTime);
    }
  },

  handleChange(event, value) {
    this.setValue(value);
    if (this.props.onChange) this.props.onChange(event, value);
  },

  errorMessage:function(){
    if(this.isPristine())
      return '';
    return this.getErrorMessage()
  },

  setMuiComponentAndMaybeFocus: setMuiComponentAndMaybeFocus,

  render() {
    const {
      defaultTime, // eslint-disable-line no-unused-vars
      ...rest,
    } = this.props;

    return (
      <TimePicker
        {...rest}
        errorText={this.errorMessage()}
        onChange={this.handleChange}
        ref={this.setMuiComponentAndMaybeFocus}
        value={this.getValue()}
      />
    );
  },
});

export default FormsyTime;
